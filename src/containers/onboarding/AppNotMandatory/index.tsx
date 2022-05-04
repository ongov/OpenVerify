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

import {useFocusEffect} from '@react-navigation/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {NavigatorParamList} from 'navigation/AppNotMandatoryNavigation';
import {useTranslation} from 'translations/i18n';
import {Button} from 'components/core/button';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import openURL from 'utils/openURL';
import * as routes from 'containers/routes';

import {
  MainContainer,
  SubContainer,
  Scroll,
  Spacing,
  BottomContainer,
} from '../styles';
import {LearMoreButton, WarningImage} from './styles';

import BodyEn from './body.en';
import BodyFr from './body.fr';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.AppNotMandatory.WarningScreen
>;

const AppNotMandatory: FC<Props> = ({route}) => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();

  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });

  const onUnderstandPress = () => {
    route.params.hideAppMandatoryScreen();
  };

  const onLearnMorePress = () => {
    openURL(I18n.t('AppNotMandatory.LearnMore.URL'), true);
  };

  return (
    <MainContainer>
      <Scroll>
        <SubContainer>
          <WarningImage />
          {I18n.locale === 'fr' ? (
            <BodyFr ref={focusRef} />
          ) : (
            <BodyEn ref={focusRef} />
          )}
        </SubContainer>
      </Scroll>
      <Spacing />
      <BottomContainer>
        <Button onPress={onUnderstandPress}>{I18n.t('Next')}</Button>
        <LearMoreButton buttonType="secondary" onPress={onLearnMorePress}>
          {I18n.t('AppNotMandatory.LearnMore.Label')}
        </LearMoreButton>
      </BottomContainer>
    </MainContainer>
  );
};

export default AppNotMandatory;
