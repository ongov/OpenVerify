/*
   Copyright 2021 Queen’s Printer for Ontario

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/en';
import 'intl/locale-data/jsonp/fr';
import 'intl/locale-data/jsonp/en-CA';
import 'intl/locale-data/jsonp/fr-CA';

import React, {useEffect} from 'react';
import {ColorSchemeName, StatusBar, useColorScheme} from 'react-native';
import {Provider, useSelector} from 'react-redux';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {ThemeProvider} from 'styled-components/native';

import AppNavigation from 'navigation/AppNavigation';

import configureStore from 'redux/store';
import {getTheme} from 'assets/theme';
import {TranslationProvider} from 'translations/i18n';

const {store, persistor} = configureStore();

import {firebase} from '@react-native-firebase/analytics';
import {getVisualAppearance} from 'redux/selectors';
import NightMode from 'modules/NightMode';

import OrientationController from 'controllers/OrientationControler';

const AppWithReduxState = () => {
  const schemePreference: 'light' | 'dark' | 'system' =
    useSelector(getVisualAppearance);
  switch (schemePreference) {
    case 'light':
      NightMode.setLight();
      break;
    case 'dark':
      NightMode.setDark();
      break;
    case 'system':
      NightMode.setSystem();
      break;
  }
  const systemScheme: ColorSchemeName = useColorScheme();
  const scheme =
    schemePreference === 'system' ? systemScheme : schemePreference;
  const theme = getTheme(scheme);
  const barStyle = scheme === 'light' ? 'dark-content' : 'light-content';

  const routeNameRef = React.useRef<any>();
  const navigationRef = useNavigationContainerRef();

  const onReadyNavigation = () => {
    routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
  };
  return (
    <TranslationProvider>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={theme.colors.background}
      />
      <ThemeProvider theme={theme}>
        <NavigationContainer
          ref={navigationRef}
          onReady={onReadyNavigation}
          theme={theme}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName =
              navigationRef?.current?.getCurrentRoute()?.name;

            if (previousRouteName !== currentRouteName) {
              await firebase.analytics().logScreenView({
                screen_name: currentRouteName,
                screen_class: currentRouteName,
              });
            }
            routeNameRef.current = currentRouteName;
          }}>
          <AppNavigation />
          <OrientationController />
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );
};

const App = () => {
  useEffect(() => {
    async function enableAnalytics() {
      if (!__DEV__) {
        await firebase.analytics().setAnalyticsCollectionEnabled(true);
      }
    }
    enableAnalytics();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppWithReduxState />
      </PersistGate>
    </Provider>
  );
};

export default App;
