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

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from 'navigation/OnboardingNavigation';
import * as routes from 'containers/routes';

import {ScrollView} from 'react-native';
import {
  MainContainer,
  TitleText,
  Spacing,
  PageContainer,
} from 'containers/settings/styles';

import {useTranslation} from 'translations/i18n';
import BodyEn from './body.en';
import BodyFr from './body.fr';
import {Button} from 'components/core/button';
import openURL from 'utils/openURL';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.Settings.HowItWorks
>;

const HowItWorks: FC<Props> = () => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
  return (
    <MainContainer>
      <ScrollView>
        <PageContainer>
          <TitleText ref={focusRef}>
            {I18n.t('Settings.HowItWorks.Title')}
          </TitleText>
          <Spacing />
          {I18n.locale === 'fr' ? <BodyFr /> : <BodyEn />}
          <Button
            buttonType="secondary"
            onPress={() => {
              openURL(
                I18n.t('Settings.HowItWorks.LearnMoreURL'),
                true,
                I18n.t('Settings.HowItWorks.LearnMoreButton'),
              );
            }}>
            {I18n.t('Settings.HowItWorks.LearnMoreButton')}
          </Button>
        </PageContainer>
      </ScrollView>
    </MainContainer>
  );
};

export default HowItWorks;
