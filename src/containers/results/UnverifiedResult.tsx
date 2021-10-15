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
import React, {FC, useState} from 'react';
import {Button} from 'components/core/button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from 'navigation/HomeNavigation';
import {useTranslation} from 'translations/i18n';
import * as r from 'containers/routes';

import {ErrorResult} from 'components/results/result';

import ErrorEn from './translations/error.en';
import ErrorFr from './translations/error.fr';

import {
  MainContainer,
  SubContainer,
  Scroll,
  Spacing,
  BottomContainer,
} from './styles';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';
import {AccessibilityInfo} from 'react-native';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  r.Results.UnverifiedResult
>;

const UnverifiedResult: FC<Props> = ({navigation}) => {
  const I18n = useTranslation();
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
    AccessibilityInfo.isScreenReaderEnabled().then(s =>
      setScreenReaderEnabled(s),
    );
  });
  return (
    <MainContainer>
      <Scroll>
        <ErrorResult ref={focusRef} />
        <SubContainer>
          {I18n.locale === 'fr' ? (
            <ErrorFr screenReaderEnabled={screenReaderEnabled} />
          ) : (
            <ErrorEn screenReaderEnabled={screenReaderEnabled} />
          )}
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

export default UnverifiedResult;
