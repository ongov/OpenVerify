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
import {NavigatorParamList} from '../../../navigation/OnboardingNavigation';
import * as routes from '../../routes';

import {
  MainContainer,
  SubContainer,
  Scroll,
  Spacing,
  BottomContainer,
} from '../styles';
import {Button} from 'components/core/button';
import {useTranslation} from 'translations/i18n';
import BodyEn from './body.en';
import BodyFr from './body.fr';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.Onboarding.AutomaticUpdates
>;

const OnboardingAutomaticUpdates: FC<Props> = ({navigation}) => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
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
      <Spacing />
      <BottomContainer>
        <Button
          onPress={() => {
            navigation.navigate(routes.Onboarding.ReadyToScan);
          }}>
          {I18n.t('Onboarding.Understand')}
        </Button>
      </BottomContainer>
    </MainContainer>
  );
};

export default OnboardingAutomaticUpdates;
