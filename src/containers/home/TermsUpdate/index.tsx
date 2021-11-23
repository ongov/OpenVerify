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
import React, {useState, FC} from 'react';
import {AccessibilityInfo} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../../../navigation/OnboardingNavigation';
import * as routes from '../../routes';

import {
  MainContainer,
  SubContainer,
  Scroll,
  TermText,
  Spacing,
  CheckBoxTouchableOpacity,
  OpenVerifyCheckBox,
  OpenVerifyCheckBoxChecked,
  BottomContainer,
  TitleText,
} from '../../onboarding/styles';

import {Button} from 'components/core/button';

import BodyEn from './body.en';
import BodyFr from './body.fr';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useTranslation} from 'translations/i18n';
import openURL from 'utils/openURL';
import {useFocusEffect} from '@react-navigation/core';
import {acceptTerms} from 'redux/actions/creators';
import {useDispatch} from 'react-redux';
import {TERMS_VERSION} from 'config/constants';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.Onboarding.Terms
>;

const TermsUpdate: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const [isChecked, setToggleCheckBox] = useState(false);
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);
  const I18n = useTranslation();
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
        <SubContainer>
          <TitleText ref={focusRef}>
            {I18n.t('Home.TermsUpdate.Title')}
          </TitleText>
          {I18n.locale === 'fr' ? <BodyFr /> : <BodyEn />}
        </SubContainer>
      </Scroll>
      <Spacing />
      <BottomContainer>
        {screenReaderEnabled && (
          <Button
            buttonType="tertiary"
            onPress={() => {
              openURL(
                I18n.t('Settings.SettingsScreen.MoreInformation.TermsOfUseURL'),
                true,
                I18n.t('Onboarding.Terms.ReadTerms'),
              );
            }}>
            {I18n.t('Onboarding.Terms.ReadTerms')}
          </Button>
        )}
        <CheckBoxTouchableOpacity
          accessible
          accessibilityRole="checkbox"
          accessibilityState={{checked: isChecked}}
          onPress={() => setToggleCheckBox(!isChecked)}
          accessibilityLabel={I18n.t('Onboarding.Terms.TermsAccept')}>
          {isChecked ? <OpenVerifyCheckBoxChecked /> : <OpenVerifyCheckBox />}
          <TermText>{I18n.t('Onboarding.Terms.TermsAccept')}</TermText>
        </CheckBoxTouchableOpacity>
        <Button
          disabled={!isChecked}
          onPress={() => {
            dispatch(acceptTerms(TERMS_VERSION));
            navigation.navigate(routes.Home.HomeScreen);
          }}>
          {I18n.t('Continue')}
        </Button>
      </BottomContainer>
    </MainContainer>
  );
};

export default TermsUpdate;
