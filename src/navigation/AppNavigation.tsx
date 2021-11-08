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
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import i18n from 'i18n-js';
import RNBootSplash from 'react-native-bootsplash';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

import OnboardingNavigation from './OnboardingNavigation';
import HomeNavigation from './HomeNavigation';
import SettingsNavigation from './SettingsNavigation';
import OverlayModal from 'containers/home/OverlayModal';

import {setManualUpdate} from 'redux/actions/creators';
import {fetchRulesAndAppVersion} from 'redux/actions/api';
import {RootState} from 'redux/store';
import * as routes from 'containers/routes';
import SecureFlag from 'modules/SecureFlag';

export interface NavigatorParamList extends ParamListBase {}

const Stack = createStackNavigator<NavigatorParamList>();

const AppNavigation = () => {
  const dispatch = useDispatch();

  const onboard = useSelector((state: RootState) => state.app.onboard);
  const language = useSelector((state: RootState) => state.app.language);

  useEffect(() => {
    dispatch(setManualUpdate(false));
    dispatch(fetchRulesAndAppVersion);

    if (language) {
      i18n.locale = language;
    }

    RNBootSplash.hide({fade: true});
  }, [dispatch, language]);

  return onboard ? (
    <OnboardingNavigation />
  ) : (
    <>
      <OverlayModal />
      <Stack.Navigator
        screenListeners={{
          state: (evt: any | undefined) => {
            try {
              let currentScreen;
              const state = evt.data?.state;
              if (state) {
                const nav = state.routes[state.index];
                if (nav.state) {
                  currentScreen = nav.state.routes[nav.state.index].name;
                }
              }
              console.debug({currentScreen});
              if (
                currentScreen === routes.Home.Scanner ||
                currentScreen === routes.Results.VerifiedResult
              ) {
                console.debug('Enable secure flag...');
                SecureFlag.enable();
              }
            } catch (err) {
              console.debug(err);
            }
          },
        }}
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name={routes.Home.HomeStack} component={HomeNavigation} />
        <Stack.Screen
          name={routes.Settings.SettingsStack}
          component={SettingsNavigation}
        />
      </Stack.Navigator>
    </>
  );
};

export default AppNavigation;
