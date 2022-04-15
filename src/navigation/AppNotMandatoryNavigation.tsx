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
import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {ParamListBase} from '@react-navigation/native';

import * as OnboardingScreens from 'containers/onboarding';
import * as route from 'containers/routes';
import Logo from 'components/logo';

export interface NavigatorParamList extends ParamListBase {
  [route.AppNotMandatory.WarningScreen]: {
    hideAppMandatoryScreen: () => void;
  };
}

const Stack = createStackNavigator<NavigatorParamList>();

type Props = {
  hideAppMandatoryScreen: () => void;
};

const AppNotMandatoryNavigation = ({hideAppMandatoryScreen}: Props) => {
  return (
    <Stack.Navigator
      initialRouteName={route.AppNotMandatory.WarningScreen}
      screenOptions={{
        header: () => <Logo />,
        headerMode: 'float',
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        name={route.AppNotMandatory.WarningScreen}
        component={OnboardingScreens.AppNotMandatory}
        initialParams={{hideAppMandatoryScreen}}
      />
    </Stack.Navigator>
  );
};

export default AppNotMandatoryNavigation;
