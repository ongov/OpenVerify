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
import React, {FC} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';
import * as SettingsScreens from 'containers/settings';
import * as CommonScreens from 'containers/common';
import * as routes from 'containers/routes';
import {useTranslation} from 'translations/i18n';

export interface NavigatorParamList extends ParamListBase {
  [routes.Common.CameraMissingPermission]: {isComingFromOnboarding: Boolean};
}

const Stack = createStackNavigator<NavigatorParamList>();

const SettingsNavigation: FC = () => {
  const I18n = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: I18n.t('Back'),
        headerTitle: () => null,
        headerStyle: {
          height: 85,
          shadowRadius: 0,
          shadowOffset: {
            height: 0,
            width: 0,
          },
        },
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name={routes.Settings.SettingsScreen}
        component={SettingsScreens.SettingsScreen}
      />
      <Stack.Screen
        name={routes.Settings.HelpUsImprove}
        component={SettingsScreens.HelpUsImprove}
      />
      <Stack.Screen
        name={routes.Settings.HowItWorks}
        component={SettingsScreens.HowItWorks}
      />
      <Stack.Screen
        name={routes.Settings.Language}
        component={SettingsScreens.Language}
      />
      <Stack.Screen
        name={routes.Settings.UpdatesHelp}
        component={SettingsScreens.UpdatesHelp}
      />
      <Stack.Screen
        name={routes.Settings.VisualAppearance}
        component={SettingsScreens.VisualAppearance}
      />
      <Stack.Screen
        name={routes.Settings.WhatResultsMean}
        component={SettingsScreens.WhatResultsMean}
      />
      <Stack.Screen
        name={routes.Common.CameraMissingPermission}
        component={CommonScreens.CameraMissingPermission}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsNavigation;
