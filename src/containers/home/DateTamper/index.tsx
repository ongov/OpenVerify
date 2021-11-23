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
import React, {FC, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {Button} from 'components/core/button';
import {NavigatorParamList} from '../../../navigation/OnboardingNavigation';

import {getLastUpdated} from 'redux/selectors';
import {isDateTampered} from 'utils/rulesHelper';

import * as routes from '../../routes';
import {useTranslation} from 'translations/i18n';
import {
  MainContainer,
  SubContainer,
  BottomContainer,
  Scroll,
  BorderSpacing,
} from '../styles';
import BodyEn from './body.en';
import BodyFr from './body.fr';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';

type Props = NativeStackScreenProps<NavigatorParamList, routes.Home.Update>;

const DateTamper: FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();
  const lastUpdated = useSelector(getLastUpdated);
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });

  useEffect(() => {
    if (lastUpdated === undefined || !isDateTampered(lastUpdated)) {
      setTimeout(() => {
        navigation?.reset({
          index: 0,
          routes: [{name: routes.Home.HomeScreen}],
        });
      }, 100);
    }
  }, [navigation, dispatch, lastUpdated]);

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
      <BorderSpacing />
      <BottomContainer>
        <Button onPress={() => navigation.navigate(routes.Home.HomeScreen)}>
          {I18n.t('Continue')}
        </Button>
      </BottomContainer>
    </MainContainer>
  );
};

export default DateTamper;
