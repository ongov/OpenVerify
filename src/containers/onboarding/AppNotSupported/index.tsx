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

import {useFocusEffect} from '@react-navigation/core';

import {useTranslation} from 'translations/i18n';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';

import {MainContainer, SubContainer, Scroll} from '../styles';
import {ErrorImage} from './styles';

import BodyEn from './body.en';
import BodyFr from './body.fr';

const AppNotMandatory = () => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();

  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });

  return (
    <MainContainer>
      <Scroll>
        <SubContainer>
          <ErrorImage />
          {I18n.locale === 'fr' ? (
            <BodyFr ref={focusRef} />
          ) : (
            <BodyEn ref={focusRef} />
          )}
        </SubContainer>
      </Scroll>
    </MainContainer>
  );
};

export default AppNotMandatory;
