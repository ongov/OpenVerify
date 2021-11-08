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
import {NavigatorParamList} from '../../navigation/OnboardingNavigation';
import * as routes from '../routes';

import {ScrollView} from 'react-native';
import {
  MainContainer,
  SubContainer,
  TitleText,
  SubtitleTextOpenSans,
  Spacing,
} from './styles';

import {Button} from 'components/core/button';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useTranslation} from 'translations/i18n';
import openURL from 'utils/openURL';
import {useFocusEffect} from '@react-navigation/core';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.Settings.HelpUsImprove
>;

const HelpUsImprove: FC<Props> = () => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
  return (
    <MainContainer>
      <ScrollView>
        <SubContainer>
          <TitleText ref={focusRef}>
            {I18n.t('Settings.HelpUsImprove.Title')}
          </TitleText>
          <Spacing />
          <SubtitleTextOpenSans>
            {I18n.t('Settings.HelpUsImprove.Body')}
          </SubtitleTextOpenSans>
          <Button
            buttonType="secondary"
            onPress={() => {
              openURL(
                I18n.t('Settings.HelpUsImprove.GiveFeedbackURL'),
                true,
                I18n.t('Settings.HelpUsImprove.GiveFeedback'),
              );
            }}>
            {I18n.t('Settings.HelpUsImprove.GiveFeedback')}
          </Button>
        </SubContainer>
      </ScrollView>
    </MainContainer>
  );
};

export default HelpUsImprove;
