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

import * as HomeScreens from 'containers/home';
import * as ResultsScreens from 'containers/results';
import * as routes from 'containers/routes';
import Logo from 'components/logo';
import {
  InvalidQRCode,
  CompleteSHC,
  InvalidThirdPartyQRCode,
} from '../services/QRCodeValidator/types';
import {useTranslation} from 'translations/i18n';
import {Colors} from 'assets/theme/base/Colors';

export interface NavigatorParamList extends ParamListBase {
  [routes.Common.CameraMissingPermission]: {isComingFromOnboarding: Boolean};
  [routes.Results.InvalidResult]: {
    response: InvalidQRCode | InvalidThirdPartyQRCode;
  };
  [routes.Results.VerifiedResult]: {
    response: CompleteSHC;
  };
}

const Stack = createStackNavigator<NavigatorParamList>();

const HomeNavigation: FC = () => {
  const I18n = useTranslation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: I18n.t('Back'),
        headerTitle: () => null,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen
        options={{
          header: () => <Logo />,
        }}
        name={routes.Home.HomeScreen}
        component={HomeScreens.HomeScreen}
      />
      <Stack.Screen
        name={routes.Home.Scanner}
        component={HomeScreens.Scanner}
        options={{
          headerMode: 'float',
          headerTransparent: true,
          headerTintColor: Colors.white,
        }}
      />
      <Stack.Screen
        name={routes.Results.InvalidResult}
        component={ResultsScreens.InvalidResultScreen}
      />
      <Stack.Screen
        name={routes.Results.UnverifiedResult}
        component={ResultsScreens.UnverifiedResultScreen}
      />
      <Stack.Screen
        name={routes.Results.VerifiedResult}
        component={ResultsScreens.VerifiedResultScreen}
      />
      <Stack.Screen
        name={routes.Results.ScannerTimedOut}
        component={ResultsScreens.ScannerTimedOut}
      />
      <Stack.Screen
        options={{
          header: () => <Logo />,
        }}
        name={routes.Home.Update}
        component={HomeScreens.Update}
      />
      <Stack.Screen
        options={{
          header: () => <Logo />,
        }}
        name={routes.Home.AppUpdate}
        component={HomeScreens.AppUpdate}
      />
      <Stack.Screen
        options={{
          header: () => <Logo />,
        }}
        name={routes.Home.DateTamper}
        component={HomeScreens.DateTamper}
      />
      <Stack.Screen
        options={{
          header: () => <Logo />,
        }}
        name={routes.Home.TermsUpdate}
        component={HomeScreens.TermsUpdate}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
