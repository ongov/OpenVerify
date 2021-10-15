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

import {WarningResult} from 'components/results/result';
import {
  InvalidQRCode,
  InvalidThirdPartyQRCode,
} from 'services/QRCodeValidator/types';

import {
  MainContainer,
  SubContainer,
  Scroll,
  Spacing,
  BottomContainer,
} from './styles';

import WarningEn from './translations/warning.en';
import WarningFr from './translations/warning.fr';
import WarningThirdPartyEn from './translations/warning_thirdparty.en';
import WarningThirdPartyFr from './translations/warning_thirdparty.fr';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';
import {AccessibilityInfo} from 'react-native';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  r.Results.InvalidResult
>;

const InvalidResult: FC<Props> = ({navigation, route}) => {
  const I18n = useTranslation();
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
    AccessibilityInfo.isScreenReaderEnabled().then(s =>
      setScreenReaderEnabled(s),
    );
  });
  const {response} = route.params as {
    response: InvalidQRCode | InvalidThirdPartyQRCode;
  };
  return (
    <MainContainer>
      {response.thirdParty ? (
        <Scroll>
          <WarningResult
            text={I18n.t('Results.WarningThirdParty.Title')}
            ref={focusRef}
          />
          <SubContainer>
            {I18n.locale === 'fr' ? (
              <WarningThirdPartyFr screenReaderEnabled={screenReaderEnabled} />
            ) : (
              <WarningThirdPartyEn screenReaderEnabled={screenReaderEnabled} />
            )}
          </SubContainer>
        </Scroll>
      ) : (
        <Scroll>
          <WarningResult ref={focusRef} />
          <SubContainer>
            {I18n.locale === 'fr' ? (
              <WarningFr screenReaderEnabled={screenReaderEnabled} />
            ) : (
              <WarningEn screenReaderEnabled={screenReaderEnabled} />
            )}
          </SubContainer>
        </Scroll>
      )}
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

export default InvalidResult;
