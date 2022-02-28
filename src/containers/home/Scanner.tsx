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
import React, {FC, useState, useRef, useCallback, useEffect} from 'react';
import {Platform} from 'react-native';
import {
  AppState,
  EventSubscription,
  LayoutChangeEvent,
  Vibration,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RNCamera, BarCodeReadEvent, hasTorch} from 'react-native-camera';
import {useFocusEffect} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {NavigatorParamList} from 'navigation/HomeNavigation';

import QRCodeScanner from 'components/scanner/QRCodeScanner';
import * as routes from 'containers/routes';

import BeepSound from 'components/results/BeepSound';

import QRCodeValidator from 'services/QRCodeValidator/QRCodeValidator';
import {
  CompleteSHC,
  InvalidQRCode,
  InvalidThirdPartyQRCode,
  QRCodeResponse,
} from 'services/QRCodeValidator/types';
import {RootState} from 'redux/store';
import {applyRules} from 'utils/validate';
import {getLastUpdated, getAppUpdateSetting} from 'redux/selectors';
import {isExpired, isDateTampered, checkAppUpdate} from 'utils/rulesHelper';

import {useTranslation} from 'translations/i18n';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {Modal} from 'components/core/modal';

import {
  CameraContainer,
  OntarioQRCodeScanner,
  TorchImage,
  TorchImageSelected,
  TopCameraOverlay,
  CentreCameraView,
  LeftRightCameraOverlay,
  BottomCameraOverlay,
  Logo,
  CameraScreenButton,
  QRScannerFocus,
  FlipCameraAndroid,
  FlipCameraIos,
} from './styles';

import {trackLogEvent} from 'utils/analytics';
import {verifyEvent} from 'config/analytics';
import {LocalConfig} from 'config';
import withinUnder12GracePeriod from 'utils/withinUnder12GracePeriod';

const {SCANNER_TIMEOUT, SCANNER_PROCESSING_ALERT_TIMEOUT} = LocalConfig;

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

function showYellowScreen(
  navigation: NativeStackNavigationProp<
    NavigatorParamList,
    routes.Home.Scanner
  >,
  invalidResponse?: InvalidQRCode | InvalidThirdPartyQRCode,
) {
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
    response: invalidResponse ?? {
      valid: false,
      thirdParty: false,
      multi: null,
    },
  });
}

function showRedScreen(
  navigation: NativeStackNavigationProp<
    NavigatorParamList,
    routes.Home.Scanner
  >,
  response: QRCodeResponse,
) {
  trackLogEvent(verifyEvent.VACCINE_SCAN, {
    scan_result: 'fail',
  });
  navigation.navigate(routes.Results.UnverifiedResult, {
    response,
  });
}

function showGreenScreen(
  navigation: NativeStackNavigationProp<
    NavigatorParamList,
    routes.Home.Scanner
  >,
  response: CompleteSHC,
) {
  trackLogEvent(verifyEvent.VACCINE_SCAN, {
    scan_result: 'pass',
  });
  navigation.navigate(routes.Results.VerifiedResult, {
    response,
  });
}

const Scanner: FC<Props> = ({navigation}) => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
  const [deviceSupportTorch, setDeviceSupportTorch] = useState(false);
  const [flash, setFlash] = useState(false);
  const [processingAlertVisible, setProcessingAlertVisiblity] = useState(false);
  const [cameraType, setCameraType] = useState(RNCamera.Constants.Type.back);
  const lastUpdated = useSelector(getLastUpdated);
  const appUpdateSetting = useSelector(getAppUpdateSetting);
  const qrValidator = new QRCodeValidator();
  const ruleJson = useSelector((state: RootState) => state.app.ruleJson);
  const [cameraHeight, setCameraHeight] = useState(0);
  const [cameraWidth, setCameraWidth] = useState(0);
  const [foreground, setForeground] = useState(false);

  const qrRef = useRef() as React.MutableRefObject<QRCodeScanner>;
  const timerRef = useRef() as React.MutableRefObject<NodeJS.Timeout>;
  const qrProcessingTimerRef =
    useRef() as React.MutableRefObject<NodeJS.Timeout>;

  const flashMode = flash
    ? RNCamera.Constants.FlashMode.torch
    : RNCamera.Constants.FlashMode.off;

  const handleLayout = (event: LayoutChangeEvent) => {
    const {height, width} = event.nativeEvent.layout;
    setCameraHeight(height);
    setCameraWidth(width);
  };

  useEffect(() => {
    async function checkForTorch() {
      const result = await hasTorch();
      setDeviceSupportTorch(result);
    }
    checkForTorch();
  }, []);

  useFocusEffect(() => {
    if (lastUpdated && isExpired(lastUpdated)) {
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: [{name: routes.Home.Update}],
        });
      }, 100);
    } else if (lastUpdated && isDateTampered(lastUpdated)) {
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
      return () => {
        setForeground(false);
        // clear QR Code processing alert timeout when screen is not in focus
        clearTimeout(qrProcessingTimerRef?.current);
        // hide QR Code processing alert when screen is not in focus
        setProcessingAlertVisiblity(false);
      };
    }, []),
  );

  const reactivate = () => {
    if (qrRef?.current?.reactivate) {
      qrRef?.current?.reactivate();
    } else {
      setTimeout(() => reactivate(), 50);
    }
  };

  const onReadQRCode = async (data: BarCodeReadEvent) => {
    // reset Timer
    setTimer();
    // show processing alert after 3 Seconds
    showQRCodeProcessingAlert();

    if (ruleJson?.publicKeys === undefined) {
      showYellowScreen(navigation);
      return;
    }
    let response = qrValidator.validateQR(ruleJson?.publicKeys, data.data);
    //Only check for rules if the ruleJson has not expired
    if (
      response.valid &&
      response.complete &&
      lastUpdated &&
      !isExpired(lastUpdated)
    ) {
      const verified = applyRules(ruleJson, response.credential);
      if (verified) {
        playSound();
        vibrate();
        showGreenScreen(navigation, response);
      } else {
        if (withinUnder12GracePeriod(response.parsedBirthDate)) {
          vibrate(2);
          showYellowScreen(navigation);
        } else {
          vibrate(3);
          showRedScreen(navigation, response);
        }
      }
    } else {
      vibrate(2);
      const invalidResponse = response.valid ? undefined : response;
      showYellowScreen(navigation, invalidResponse);
    }
  };

  const showQRCodeProcessingAlert = useCallback(() => {
    if (qrProcessingTimerRef.current) {
      clearTimeout(qrProcessingTimerRef.current);
    }

    qrProcessingTimerRef.current = setTimeout(() => {
      if (navigation.isFocused()) {
        setProcessingAlertVisiblity(true);
      }
    }, SCANNER_PROCESSING_ALERT_TIMEOUT);
  }, [navigation]);

  const setTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      if (navigation.isFocused()) {
        trackLogEvent(verifyEvent.SCANNER_TIMEOUT, {
          scan_result: 'error',
        });
        navigation.navigate(routes.Results.ScannerTimedOut);
      }
    }, SCANNER_TIMEOUT);
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
        <OntarioQRCodeScanner
          ref={qrRef}
          cameraProps={{
            flashMode: flashMode,
            barCodeTypes: [RNCamera.Constants.BarCodeType.qr],
          }}
          onRead={onReadQRCode}
          cameraType={cameraType}
        />
      )}

      <TopCameraOverlay cameraHeight={cameraHeight} />
      <Logo cameraHeight={cameraHeight} accessibilityLabel="Ontario" />
      <CentreCameraView cameraHeight={cameraHeight}>
        <LeftRightCameraOverlay cameraWidth={cameraWidth} />
        <QRScannerFocus
          ref={focusRef}
          accessible
          accessibilityLabel={
            cameraType === RNCamera.Constants.Type.back
              ? I18n.t('Home.Scanner.AccessibleTitleBack')
              : I18n.t('Home.Scanner.AccessibleTitleFront')
          }
        />
        <LeftRightCameraOverlay cameraWidth={cameraWidth} />
      </CentreCameraView>
      <BottomCameraOverlay cameraHeight={cameraHeight}>
        <CameraScreenButton
          accessibilityLabel={
            cameraType === RNCamera.Constants.Type.back
              ? I18n.t('Home.Scanner.SwitchToFrontCamera')
              : I18n.t('Home.Scanner.SwitchToBackCamera')
          }
          icon={
            Platform.OS === 'ios' ? <FlipCameraIos /> : <FlipCameraAndroid />
          }
          onPress={() => {
            trackLogEvent(verifyEvent.SWITCH_CAMERA, {
              camera_status:
                cameraType === RNCamera.Constants.Type.back ? 'front' : 'back',
            });
            setCameraType(
              cameraType === RNCamera.Constants.Type.back
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back,
            );
            setTimeout(setFocus, 100);
          }}>
          {I18n.t('Home.Scanner.SwitchCamera')}
        </CameraScreenButton>
        {deviceSupportTorch ? (
          <CameraScreenButton
            accessibilityState={{selected: flash}}
            accessibilityLabel={I18n.t('Home.Scanner.Flashlight')}
            icon={flash ? <TorchImageSelected /> : <TorchImage />}
            selected={flash}
            onPress={() => {
              trackLogEvent(verifyEvent.FLASHLIGHT_CLICK, {
                flashlight_status: flash ? 'on' : 'off',
              });
              setFlash(!flash);
            }}>
            {I18n.t('Home.Scanner.Flashlight')}
          </CameraScreenButton>
        ) : null}
      </BottomCameraOverlay>
      <Modal
        isVisible={processingAlertVisible}
        title={I18n.t('Home.Scanner.QRProcessingAlertTitle')}
        body={I18n.t('Home.Scanner.QRProcessingAlertMessage')}
      />
    </CameraContainer>
  );
};

export default Scanner;
