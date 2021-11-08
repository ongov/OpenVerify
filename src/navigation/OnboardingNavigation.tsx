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
import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

import * as OnboardingScreens from 'containers/onboarding';
import * as CommonScreens from 'containers/common';
import * as route from 'containers/routes';
import Logo from 'components/logo';
import {useTranslation} from 'translations/i18n';
import {userHasEnabledCameraPermission} from 'utils/camera';

export interface NavigatorParamList extends ParamListBase {
  [route.Common.CameraMissingPermission]: {isComingFromOnboarding: Boolean};
}

const Stack = createStackNavigator<NavigatorParamList>();

const OnboardingNavigation = () => {
  const I18n = useTranslation();
  const [showCameraPermissions, setShowCameraPermissions] = useState(true);

  useEffect(() => {
    (async () => {
      const userEnabledCamera: Boolean = await userHasEnabledCameraPermission(
        Platform.OS,
      );
      if (showCameraPermissions !== !userEnabledCamera) {
        setShowCameraPermissions(!userEnabledCamera);
      }
    })();
  });

  return (
    <Stack.Navigator
      initialRouteName={route.Onboarding.AppForBusinesses}
      screenOptions={{
        header: () => <Logo />,
        headerMode: 'float',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name={route.Onboarding.AppForBusinesses}
        component={OnboardingScreens.AppForBusinesses}
        options={{
          header: () => (
            <Logo
              rightText={I18n.t('Onboarding.Step', {
                current: 1,
                total: showCameraPermissions ? 6 : 5,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={route.Onboarding.WhatAppDoes}
        component={OnboardingScreens.WhatAppDoes}
        options={{
          header: () => (
            <Logo
              rightText={I18n.t('Onboarding.Step', {
                current: 2,
                total: showCameraPermissions ? 6 : 5,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={route.Onboarding.WhatAppDoesNot}
        component={OnboardingScreens.WhatAppDoesNot}
        options={{
          header: () => (
            <Logo
              rightText={I18n.t('Onboarding.Step', {
                current: 3,
                total: showCameraPermissions ? 6 : 5,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={route.Onboarding.Terms}
        component={OnboardingScreens.Terms}
        options={{
          header: () => (
            <Logo
              rightText={I18n.t('Onboarding.Step', {
                current: 4,
                total: showCameraPermissions ? 6 : 5,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={route.Onboarding.CameraPermissions}
        component={OnboardingScreens.CameraPermissions}
        options={{
          header: () => (
            <Logo
              rightText={I18n.t('Onboarding.Step', {current: 5, total: 6})}
            />
          ),
        }}
      />
      <Stack.Screen
        name={route.Onboarding.AutomaticUpdates}
        component={OnboardingScreens.AutomaticUpdates}
        options={{
          header: () => (
            <Logo
              rightText={I18n.t('Onboarding.Step', {
                current: showCameraPermissions ? 6 : 5,
                total: showCameraPermissions ? 6 : 5,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={route.Onboarding.ReadyToScan}
        component={OnboardingScreens.ReadyToScan}
      />
      <Stack.Screen
        name={route.Common.CameraMissingPermission}
        component={CommonScreens.CameraMissingPermission}
      />
    </Stack.Navigator>
  );
};

export default OnboardingNavigation;
