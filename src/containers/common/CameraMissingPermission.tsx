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
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {openSettings} from 'react-native-permissions';
import {Button} from 'components/core/button';
import {NavigatorParamList} from '../../navigation/HomeNavigation';
import {useTranslation} from 'translations/i18n';
import * as routes from '../routes';
import {
  MainContainer,
  Scroll,
  Spacing,
  SubContainer,
  SubtitleText,
  TitleText,
} from '../home/styles';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.Common.CameraMissingPermission
>;

const CameraMissingPermission: FC<Props> = ({navigation, route}) => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
  const {isComingFromOnboarding} = route.params as {
    isComingFromOnboarding: boolean;
  };

  const openAppSettings = (): void => {
    openSettings();
  };

  const goBackToHome = (): void => {
    navigation.goBack();
  };

  return (
    <MainContainer>
      <Scroll scrollEnabled={false}>
        <SubContainer>
          <TitleText ref={focusRef}>
            {I18n.t('Home.CameraPermission.AllowCameraAccessTitle')}
          </TitleText>
        </SubContainer>
        <SubContainer>
          <SubtitleText>
            {I18n.t('Home.CameraPermission.AllowCameraAccessMessage')}
          </SubtitleText>
        </SubContainer>
      </Scroll>
      <SubContainer>
        <Button onPress={openAppSettings} buttonType="primary">
          {I18n.t('Home.CameraPermission.GoToSetting')}
        </Button>
        {!isComingFromOnboarding && (
          <>
            <Spacing />
            <Button onPress={goBackToHome} buttonType="secondary">
              {I18n.t('Home.CameraPermission.GoBackToHome')}
            </Button>
          </>
        )}
      </SubContainer>
    </MainContainer>
  );
};

export default CameraMissingPermission;
