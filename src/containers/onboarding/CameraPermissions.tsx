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
import {Platform} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from '../../navigation/OnboardingNavigation';
import * as routes from '../routes';
import {
  MainContainer,
  SubContainer,
  Scroll,
  TitleText,
  SubtitleText,
  Spacing,
  BottomContainer,
} from './styles';
import {Button} from 'components/core/button';
import {useTranslation} from 'translations/i18n';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {useFocusEffect} from '@react-navigation/native';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {userHasEnabledCameraPermission} from 'utils/camera';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.Onboarding.CameraPermissions
>;

const OnboardingCameraPermissions: FC<Props> = ({navigation}) => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
  const onPressContinue = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    )
      .then(result => {
        if (result === RESULTS.GRANTED) {
          navigation.navigate(routes.Onboarding.AutomaticUpdates);
        } else {
          navigation.navigate(routes.Common.CameraMissingPermission, {
            isComingFromOnboarding: true,
          });
        }
      })
      .catch(() =>
        navigation.navigate(routes.Common.CameraMissingPermission, {
          isComingFromOnboarding: true,
        }),
      );
  };

  useFocusEffect(
    React.useCallback(() => {
      const checkCameraPermission = async () => {
        const userEnabledCamera: Boolean = await userHasEnabledCameraPermission(
          Platform.OS,
        );
        if (userEnabledCamera) {
          navigation.navigate(routes.Onboarding.AutomaticUpdates);
        }
      };
      checkCameraPermission();
      return () => {};
    }, [navigation]),
  );

  return (
    <MainContainer>
      <Scroll>
        <SubContainer>
          <TitleText ref={focusRef}>
            {I18n.t('Onboarding.CameraPermissions.Camera')}
          </TitleText>
          <SubtitleText>
            {I18n.t('Onboarding.CameraPermissions.CameraDetail')}
          </SubtitleText>
        </SubContainer>
      </Scroll>
      <Spacing />

      <BottomContainer>
        <Button onPress={onPressContinue}>{I18n.t('Next')}</Button>
      </BottomContainer>
    </MainContainer>
  );
};

export default OnboardingCameraPermissions;
