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
import React from 'react';

import {
  MainContainer,
  SubContainer,
  Scroll,
  TitleText,
  SubtitleText,
  Spacing,
  BottomContainer,
} from './styles';

import {useDispatch} from 'react-redux';

import {Button} from 'components/core/button';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {onboardUser} from '../../redux/actions/creators';
import {useTranslation} from 'translations/i18n';
import {useFocusEffect} from '@react-navigation/core';

const OnboardingReadyToScan = () => {
  const dispatch = useDispatch();
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
  return (
    <MainContainer>
      <Scroll>
        <SubContainer>
          <TitleText ref={focusRef}>
            {I18n.t('Onboarding.ReadyToScan.ReadyToScan')}
          </TitleText>
          <SubtitleText>
            {I18n.t('Onboarding.ReadyToScan.ReadyToScanDetails')}
          </SubtitleText>
        </SubContainer>
      </Scroll>
      <Spacing />
      <BottomContainer>
        <Button
          onPress={() => {
            dispatch(onboardUser(true));
          }}>
          {I18n.t('Next')}
        </Button>
      </BottomContainer>
    </MainContainer>
  );
};

export default OnboardingReadyToScan;
