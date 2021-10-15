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
import {Platform, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Config} from 'react-native-config';

import {Button} from 'components/core/button';
import {NavigatorParamList} from '../../../navigation/OnboardingNavigation';

import {getAppUpdateSetting} from 'redux/selectors';
import {checkAppUpdate} from 'utils/rulesHelper';

import * as routes from '../../routes';
import {LocalConfig} from '../../../config/index';
import {useTranslation} from 'translations/i18n';
import {
  MainContainer,
  SubContainer,
  BottomContainer,
  Scroll,
  BorderSpacing,
} from '../styles';
import BodyEn from './body.en';
import BodyFr from './body.fr';

type Props = NativeStackScreenProps<NavigatorParamList, routes.Home.Update>;

const APP_STORE_LINK_ID =
  Config.APP_STORE_LINK_ID ?? LocalConfig.APP_STORE_LINK_ID;

import {trackLogEvent} from '../../../utils/analytics';
import {verifyEvent} from '../../../config/analytics';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';

const AppUpdate: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const appUpdateSetting = useSelector(getAppUpdateSetting);
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });

  useEffect(() => {
    if (checkAppUpdate(appUpdateSetting)) {
      trackLogEvent(verifyEvent.VERSION_UPDATE_PROMPT);
    }
  }, [appUpdateSetting]);

  useEffect(() => {
    if (!checkAppUpdate(appUpdateSetting)) {
      setTimeout(() => {
        navigation?.reset({
          index: 0,
          routes: [{name: routes.Home.HomeScreen}],
        });
      }, 100);
    }
  }, [navigation, dispatch, appUpdateSetting]);

  return (
    <MainContainer>
      <Scroll>
        <SubContainer>
          {I18n.locale === 'fr' ? (
            <BodyFr ref={focusRef} />
          ) : (
            <BodyEn ref={focusRef} />
          )}
        </SubContainer>
      </Scroll>
      <BorderSpacing />
      <BottomContainer>
        <Button
          onPress={() => {
            trackLogEvent(verifyEvent.VERSION_UPDATE_CLICK);
            const url =
              Platform.OS === 'ios'
                ? `itms-apps://itunes.apple.com/us/app/id${APP_STORE_LINK_ID}?mt=8`
                : 'market://details?id=openverify.replace.me';
            trackLogEvent(verifyEvent.LINK_CLICK, {
              outbound: true,
              link_url: url,
              link_text: I18n.t('Home.AppUpdate.ViewUpdate'),
            });
            Linking.canOpenURL(url).then(
              (supported): void => {
                supported && Linking.openURL(url);
              },
              err => console.log(err),
            );
          }}>
          {I18n.t('Home.AppUpdate.ViewUpdate')}
        </Button>
      </BottomContainer>
    </MainContainer>
  );
};

export default AppUpdate;
