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
import React, {FC, useRef, useCallback} from 'react';
import {AppState, EventSubscription} from 'react-native';
import {Button} from 'components/core/button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from 'navigation/HomeNavigation';
import {useTranslation} from 'translations/i18n';
import * as r from 'containers/routes';

import {SuccessResult} from 'components/results/result';

import {
  MainContainer,
  SubContainer,
  Scroll,
  TitleText,
  Spacing,
  VerifiedP,
  VerifiedB,
  BottomContainer,
} from './styles';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';
import {CompleteSHC} from 'services/QRCodeValidator/types';
import {trackLogEvent} from 'utils/analytics';
import {verifyEvent} from 'config/analytics';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  r.Results.VerifiedResult
>;

const VerifiedResult: FC<Props> = ({navigation, route}) => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
  const {response} = route.params as {
    response: CompleteSHC;
  };
  const timerRef = useRef() as React.MutableRefObject<NodeJS.Timeout>;
  const setTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (navigation.isFocused()) {
        trackLogEvent(verifyEvent.VERIFIED_TIMEOUT);
        navigation.reset({
          index: 0,
          routes: [{name: r.Home.HomeScreen}],
        });
      }
    }, 30_000); //30 seconds
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [navigation]);

  useFocusEffect(setTimer);

  useFocusEffect(
    useCallback(() => {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          clearTimeout(timerRef.current);
        }
        if (navigation.isFocused()) {
          trackLogEvent(verifyEvent.VERIFIED_BACKGROUNDED);
          navigation.reset({
            index: 0,
            routes: [{name: r.Home.HomeScreen}],
          });
        }
      }) as unknown as EventSubscription;

      return () => {
        subscription.remove();
      };
    }, [navigation]),
  );

  return (
    <MainContainer>
      <Scroll>
        <SuccessResult ref={focusRef} />
        <SubContainer>
          <TitleText>{I18n.t('Results.Success.Subtitle')}</TitleText>
          <VerifiedP>
            {I18n.t('Results.Success.Name')}
            <VerifiedB> {response.name}</VerifiedB>
          </VerifiedP>
          <VerifiedP>
            {I18n.t('Results.Success.DateOfBirth')}
            <VerifiedB> {response.birthDate}</VerifiedB>
          </VerifiedP>
        </SubContainer>
      </Scroll>
      <Spacing />
      <BottomContainer>
        <Button
          onPress={() => {
            navigation.goBack();
          }}>
          {I18n.t('Results.ScanAnotherQRCode')}
        </Button>
      </BottomContainer>
    </MainContainer>
  );
};

export default VerifiedResult;
