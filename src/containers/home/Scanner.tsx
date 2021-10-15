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
import React, {FC, useState, useRef, useCallback} from 'react';
import {
  AppState,
  EventSubscription,
  LayoutChangeEvent,
  Vibration,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigatorParamList} from 'navigation/HomeNavigation';

import QRCodeScanner from 'components/scanner/QRCodeScanner';
import * as routes from 'containers/routes';

import BeepSound from 'components/results/BeepSound';

import QRCodeValidator from 'services/QRCodeValidator/QRCodeValidator';
import {
  InvalidQRCode,
  InvalidThirdPartyQRCode,
} from 'services/QRCodeValidator/types';
import {RootState} from 'redux/store';
import {applyRules} from 'utils/validate';
import {getLastUpdated, getAppUpdateSetting} from 'redux/selectors';
import {isExpired, isDateTampered, checkAppUpdate} from 'utils/rulesHelper';

import {useTranslation} from 'translations/i18n';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';

import {
  CameraContainer,
  OpenVerifyQRCodeScanner,
  TorchImage,
  TopCameraOverlay,
  CentreCameraView,
  LeftRightCameraOverlay,
  BottomCameraOverlay,
  Logo,
  FlashlightButton,
  QRScannerFocus,
} from './styles';

import {trackLogEvent} from 'utils/analytics';
import {verifyEvent} from 'config/analytics';

type Props = NativeStackScreenProps<NavigatorParamList, routes.Home.Scanner>;

function vibrate(times: number = 1) {
  try {
    for (let i = 0; i < times; i++) {
      setTimeout(Vibration.vibrate, i * 1000);
    }
  } catch (e) {
    console.debug(e);
  }
}

function playSound() {
  try {
    BeepSound.play(() => {});
  } catch (e) {
    console.debug(e);
  }
}

const Scanner: FC<Props> = ({navigation}) => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
  const [flash, setFlash] = useState(false);
  const lastUpdated = useSelector(getLastUpdated);
  const appUpdateSetting = useSelector(getAppUpdateSetting);
  const qrValidator = new QRCodeValidator();
  const ruleJson = useSelector((state: RootState) => state.app.ruleJson);
  const [cameraHeight, setCameraHeight] = useState(0);
  const [cameraWidth, setCameraWidth] = useState(0);
  const [foreground, setForeground] = useState(false);
  const timerRef = useRef() as React.MutableRefObject<NodeJS.Timeout>;
  const flashMode = flash
    ? RNCamera.Constants.FlashMode.torch
    : RNCamera.Constants.FlashMode.off;

  const handleLayout = (event: LayoutChangeEvent) => {
    const {height, width} = event.nativeEvent.layout;
    setCameraHeight(height);
    setCameraWidth(width);
  };

  useFocusEffect(() => {
    if (isExpired(lastUpdated)) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: routes.Home.Update}],
        });
      }, 100);
    } else if (isDateTampered(lastUpdated)) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: routes.Home.DateTamper}],
        });
      }, 100);
    } else if (checkAppUpdate(appUpdateSetting)) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: routes.Home.AppUpdate}],
        });
      }, 100);
    }

    reactivate();
  });

  useFocusEffect(
    useCallback(() => {
      setForeground(true);
      return () => setForeground(false);
    }, []),
  );

  const qrRef = useRef() as React.MutableRefObject<QRCodeScanner>;

  const reactivate = () => {
    if (qrRef?.current?.reactivate) {
      qrRef?.current?.reactivate();
    } else {
      setTimeout(() => reactivate(), 50);
    }
  };

  const onReadQRCode = (data: BarCodeReadEvent) => {
    let response = qrValidator.validateQR(ruleJson?.publicKeys, data.data);
    //Only check for rules if the ruleJson has not expired
    if (response.valid && response.complete && !isExpired(lastUpdated)) {
      let verified = applyRules(ruleJson, response.credential);
      if (verified) {
        playSound();
        vibrate();
        trackLogEvent(verifyEvent.VACCINE_SCAN, {
          scan_result: 'pass',
        });
        navigation.navigate(routes.Results.VerifiedResult, {
          response,
        });
      } else {
        trackLogEvent(verifyEvent.VACCINE_SCAN, {
          scan_result: 'fail',
        });
        vibrate(3);
        navigation.navigate(routes.Results.UnverifiedResult, {
          response,
        });
      }
    } else {
      vibrate(2);
      let invalidResponse = response as InvalidQRCode | InvalidThirdPartyQRCode;
      if (invalidResponse?.thirdParty) {
        trackLogEvent(verifyEvent.VACCINE_SCAN, {
          scan_result: 'error_third_party',
        });
      } else {
        trackLogEvent(verifyEvent.VACCINE_SCAN, {
          scan_result: 'error',
        });
      }
      navigation.navigate(routes.Results.InvalidResult, {
        response: invalidResponse,
      });
    }
  };

  const setTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (navigation.isFocused()) {
        let response: InvalidQRCode = {
          valid: false,
          multi: null,
          thirdParty: false,
        };
        trackLogEvent(verifyEvent.SCANNER_TIMEOUT, {
          scan_result: 'error',
        });
        navigation.navigate(routes.Results.InvalidResult, {
          response,
        });
      }
    }, 30_000); //30 seconds
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [navigation]);

  useFocusEffect(setTimer);

  useFocusEffect(
    useCallback(() => {
      const subscription = AppState.addEventListener('change', nextAppState => {
        if (nextAppState === 'background' || nextAppState === 'inactive') {
          clearTimeout(timerRef.current);
          setForeground(false);
        } else {
          setTimer();
          setForeground(true);
        }
      }) as unknown as EventSubscription;

      return () => {
        subscription.remove();
      };
    }, [setTimer]),
  );

  return (
    <CameraContainer onLayout={handleLayout}>
      {foreground && (
        <OpenVerifyQRCodeScanner
          ref={qrRef}
          cameraProps={{
            flashMode: flashMode,
            barCodeTypes: [RNCamera.Constants.BarCodeType.qr],
          }}
          onRead={onReadQRCode}
        />
      )}

      <TopCameraOverlay cameraHeight={cameraHeight} />
      <Logo cameraHeight={cameraHeight} accessibilityLabel="Open Verify" />
      <CentreCameraView cameraHeight={cameraHeight}>
        <LeftRightCameraOverlay cameraWidth={cameraWidth} />
        <QRScannerFocus
          ref={focusRef}
          accessible
          accessibilityLabel={I18n.t('Home.Scanner.AccessibleTitle')}
        />
        <LeftRightCameraOverlay cameraWidth={cameraWidth} />
      </CentreCameraView>
      <BottomCameraOverlay cameraHeight={cameraHeight}>
        <FlashlightButton
          buttonType="flashlight"
          accessibilityState={{selected: flash}}
          accessibilityLabel={I18n.t('Home.Scanner.Flashlight')}
          icon={<TorchImage />}
          onPress={() => {
            trackLogEvent(verifyEvent.FLASHLIGHT_CLICK, {
              flashlight_status: flash ? 'on' : 'off',
            });
            setFlash(!flash);
          }}>
          {I18n.t('Home.Scanner.Flashlight')}
        </FlashlightButton>
      </BottomCameraOverlay>
    </CameraContainer>
  );
};
export default Scanner;
