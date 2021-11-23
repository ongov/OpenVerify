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
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Config from 'react-native-config';
import {LocalConfig} from 'config/index';

import {Button} from 'components/core/button';
import {NavigatorParamList} from '../../../navigation/OnboardingNavigation';
import {
  isExpired,
  showRedWarning,
  showYellowWarning,
  getRulesUpdatedAgo,
} from 'utils/rulesHelper';

import {getLastUpdated} from 'redux/selectors';
import {setManualUpdate} from 'redux/actions/creators';
import {fetchRulesAndAppVersion} from 'redux/actions/api';

import * as routes from '../../routes';
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

const EXPIRED_INTERVAL = parseInt(
  Config.EXPIRED_INTERVAL ?? LocalConfig.EXPIRED_INTERVAL,
  10,
);
import {trackLogEvent} from '../../../utils/analytics';
import {verifyEvent} from '../../../config/analytics';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';

type Props = NativeStackScreenProps<NavigatorParamList, routes.Home.Update>;

const Update: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const lastUpdated = useSelector(getLastUpdated);
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });

  const expired = lastUpdated !== undefined ? isExpired(lastUpdated) : false;
  const redWarning =
    lastUpdated !== undefined ? showRedWarning(lastUpdated) : false;
  const yellowWarning =
    lastUpdated !== undefined ? showYellowWarning(lastUpdated) : false;
  const updatedAgo =
    lastUpdated !== undefined ? getRulesUpdatedAgo(lastUpdated) : 0;
  const daysLeft = EXPIRED_INTERVAL - updatedAgo;

  useEffect(() => {
    if (expired || redWarning || yellowWarning) {
      if (expired) {
        trackLogEvent(verifyEvent.CONNECTION_PROMPT, {
          connection_warning: 'third',
        });
      } else {
        trackLogEvent(verifyEvent.CONNECTION_PROMPT, {
          connection_warning: redWarning ? 'second' : 'first',
        });
      }
    }
  }, [expired, redWarning, yellowWarning]);

  useEffect(() => {
    if (!expired && !redWarning && !yellowWarning) {
      setTimeout(() => {
        navigation?.reset({
          index: 0,
          routes: [{name: routes.Home.HomeScreen}],
        });
      }, 100);
    }
  }, [navigation, expired, redWarning, yellowWarning, dispatch]);

  return (
    <MainContainer>
      <Scroll>
        <SubContainer>
          {I18n.locale === 'fr' ? (
            <BodyFr
              ref={focusRef}
              expired={expired}
              redWarning={redWarning}
              yellowWarning={yellowWarning}
              daysLeft={daysLeft}
            />
          ) : (
            <BodyEn
              ref={focusRef}
              expired={expired}
              redWarning={redWarning}
              yellowWarning={yellowWarning}
              daysLeft={daysLeft}
            />
          )}
        </SubContainer>
      </Scroll>
      <BorderSpacing />
      <BottomContainer>
        <Button
          onPress={() => {
            dispatch(setManualUpdate(true));
            dispatch(fetchRulesAndAppVersion);
          }}>
          {I18n.t('Home.ConnectToInternet.ConnectForUpdates')}
        </Button>
        {(redWarning || yellowWarning) && (
          <Button
            buttonType="secondary"
            onPress={() => {
              navigation?.navigate(routes.Home.HomeScreen);
            }}>
            {I18n.t('Home.ConnectToInternet.ContinueWithoutConnecting')}
          </Button>
        )}
      </BottomContainer>
    </MainContainer>
  );
};

export default Update;
