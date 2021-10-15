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
import {MainContainer, SubContainer, TitleText, RadioSpacing} from './styles';
import {RadioGroup, RadioChoice} from 'components/core/radio';
import {selectLanguage} from 'redux/actions/creators';
import {useDispatch} from 'react-redux';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useTranslation} from 'translations/i18n';
import {useFocusEffect} from '@react-navigation/core';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.Settings.Language
>;

const Language: FC<Props> = () => {
  const dispatch = useDispatch();
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
            {I18n.t('Settings.Language.Title')}
          </TitleText>
          <RadioSpacing />
          <RadioGroup
            currentValue={I18n.locale}
            onChange={(value: string) => dispatch(selectLanguage(value))}>
            <RadioChoice
              name={I18n.t('Settings.Language.English')}
              value="en"
            />
            <RadioChoice name={I18n.t('Settings.Language.French')} value="fr" />
          </RadioGroup>
        </SubContainer>
      </ScrollView>
    </MainContainer>
  );
};

export default Language;
