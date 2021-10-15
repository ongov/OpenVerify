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
import {Provider} from 'react-redux';
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

const App = () => {
  const scheme: ColorSchemeName = useColorScheme();
  const theme = getTheme(scheme);
  const barStyle = scheme === 'light' ? 'dark-content' : 'light-content';

  const routeNameRef = React.useRef<any>();
  const navigationRef = useNavigationContainerRef();

  const onReadyNavigation = () => {
    routeNameRef.current = navigationRef?.current?.getCurrentRoute()?.name;
  };

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
        <TranslationProvider>
          <StatusBar
            barStyle={barStyle}
            backgroundColor={theme.colors.transparent}
          />
          <ThemeProvider theme={theme}>
            <NavigationContainer
              ref={navigationRef}
              onReady={onReadyNavigation}
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
            </NavigationContainer>
          </ThemeProvider>
        </TranslationProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
