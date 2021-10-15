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

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from 'navigation/OnboardingNavigation';
import * as routes from 'containers/routes';

import {AccessibilityInfo, ScrollView} from 'react-native';
import {
  MainContainer,
  PageContainer,
  TitleText,
  Spacing,
  SubContainer,
} from 'containers/settings/styles';

import {Button} from 'components/core/button';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useTranslation} from 'translations/i18n';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.Settings.WhatResultsMean
>;

import BodyEn from './body.en';
import BodyFr from './body.fr';
import openURL from 'utils/openURL';
import {useFocusEffect} from '@react-navigation/core';

const WhatResultsMean: FC<Props> = () => {
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
      <ScrollView>
        <SubContainer>
          <TitleText ref={focusRef}>
            {I18n.t('Settings.WhatResultsMean.Title')}
          </TitleText>
          <Spacing />
        </SubContainer>
        {I18n.locale === 'fr' ? (
          <BodyFr screenReaderEnabled={screenReaderEnabled} />
        ) : (
          <BodyEn screenReaderEnabled={screenReaderEnabled} />
        )}
        <PageContainer>
          <Button
            buttonType="secondary"
            onPress={() => {
              openURL(
                I18n.t('Settings.WhatResultsMean.LearnMoreURL'),
                true,
                I18n.t('Settings.WhatResultsMean.LearnMoreButton'),
              );
            }}>
            {I18n.t('Settings.WhatResultsMean.LearnMoreButton')}
          </Button>
        </PageContainer>
      </ScrollView>
    </MainContainer>
  );
};

export default WhatResultsMean;
