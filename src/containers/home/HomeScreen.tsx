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
import React, {FC, useEffect} from 'react';
import {Platform} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from 'navigation/HomeNavigation';
import {useFocusEffect} from '@react-navigation/native';

import {
  getLastUpdated,
  getLastCheckedForUpdate,
  getAppUpdateSetting,
  acceptedTermsAtLeastVersion,
} from 'redux/selectors';

import {userHasEnabledCameraPermission} from 'utils/camera';
import {
  isExpired,
  showRedWarning,
  showYellowWarning,
  allowRulesUpdate,
  isDateTampered,
  checkAppUpdate,
} from 'utils/rulesHelper';
import {setManualUpdate} from 'redux/actions/creators';
import {fetchRulesAndAppVersion} from 'redux/actions/api';

import * as routes from 'containers/routes';
import {useTranslation} from 'translations/i18n';

import {
  MainContainer,
  BottomContainer,
  HomeButton,
  HomePolicyButton,
  ErrorSmallImage,
  WarningSmallImage,
} from './styles';
import {RootState} from 'redux/store';
import {TERMS_VERSION} from 'config/constants';

type Props = NativeStackScreenProps<NavigatorParamList, routes.Home.HomeScreen>;

const HomeScreen: FC<Props> = ({navigation}) => {
  const I18n = useTranslation();
  const dispatch = useDispatch();
  const lastUpdated = useSelector(getLastUpdated);
  const appUpdateSetting = useSelector(getAppUpdateSetting);
  const lastCheckedForUpdate = useSelector(getLastCheckedForUpdate);
  const showTermsUpdate = useSelector(
    (state: RootState) => !acceptedTermsAtLeastVersion(state, TERMS_VERSION),
  );
  const yellowWarning = lastUpdated ? showYellowWarning(lastUpdated) : false;
  const redWarning = lastUpdated ? showRedWarning(lastUpdated) : false;

  useFocusEffect(() => {
    if (
      lastCheckedForUpdate === undefined ||
      allowRulesUpdate(lastCheckedForUpdate)
    ) {
      dispatch(setManualUpdate(false));
      dispatch(fetchRulesAndAppVersion);
    }
  });

  useEffect(() => {
    if (yellowWarning || redWarning) {
      // For some reason if we don't have this 100ms delay then
      // reset doesn't work on first launch even when the condition is satisfied
      setTimeout(() => {
        navigation.push(routes.Home.Update);
      }, 100);
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (showTermsUpdate) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: routes.Home.TermsUpdate}],
        });
      }, 100);
    } else if (lastUpdated && isExpired(lastUpdated)) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: routes.Home.Update}],
        });
      }, 100);
    } else if (lastUpdated && isDateTampered(lastUpdated)) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: routes.Home.DateTamper}],
        });
      }, 100);
    } else if (checkAppUpdate(appUpdateSetting)) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: routes.Home.AppUpdate}],
        });
      }, 100);
    }
  }, [showTermsUpdate, appUpdateSetting, lastUpdated, navigation]);

  const onPressCheckVaccinationStatus = async () => {
    const userEnabledCamera: Boolean = await userHasEnabledCameraPermission(
      Platform.OS,
    );
    if (userEnabledCamera) {
      navigation.navigate(routes.Home.Scanner);
    } else {
      navigation.navigate(routes.Settings.SettingsStack, {
        screen: routes.Common.CameraMissingPermission,
        params: {
          isComingFromOnboarding: false,
        },
      });
    }
  };

  return (
    <MainContainer>
      <BottomContainer>
        <HomeButton onPress={onPressCheckVaccinationStatus}>
          {I18n.t('Home.HomeScreen.CheckVaccinationStatus')}
        </HomeButton>
        <HomeButton
          onPress={() => {
            navigation.navigate(routes.Settings.SettingsStack);
          }}
          icon={
            redWarning ? (
              <ErrorSmallImage />
            ) : yellowWarning ? (
              <WarningSmallImage />
            ) : undefined
          }
          buttonType="secondary">
          {I18n.t('Home.HomeScreen.SettingsScreen')}
        </HomeButton>
        <HomePolicyButton
          onPress={() => {
            navigation.navigate(routes.Settings.SettingsStack, {
              screen: routes.Settings.WhatResultsMean,
            });
          }}
          buttonType="tertiary">
          {I18n.t('Settings.WhatResultsMean.Title')}
        </HomePolicyButton>
      </BottomContainer>
    </MainContainer>
  );
};

export default HomeScreen;
