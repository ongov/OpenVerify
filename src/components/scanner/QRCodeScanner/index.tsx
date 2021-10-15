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
import React, {Component, RefObject} from 'react';
import {ViewStyle, StyleProp} from 'react-native';
import {RNCamera, RNCameraProps, BarCodeReadEvent} from 'react-native-camera';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Platform,
  TouchableWithoutFeedback,
  PermissionsAndroid,
} from 'react-native';

export interface QRCodeScannerProps {
  onRead(e: BarCodeReadEvent): void;
  reactivate?: boolean;
  reactivateTimeout?: number;
  showMarker?: boolean;
  cameraType?: 'front' | 'back';
  customMarker?: JSX.Element;
  containerStyle?: StyleProp<ViewStyle>;
  cameraStyle?: StyleProp<ViewStyle>;
  markerStyle?: StyleProp<ViewStyle>;
  topViewStyle?: StyleProp<ViewStyle>;
  bottomViewStyle?: StyleProp<ViewStyle>;
  topContent?: JSX.Element | string;
  bottomContent?: JSX.Element | string;
  notAuthorizedView?: JSX.Element;
  pendingAuthorizationView?: JSX.Element;
  permissionDialogTitle?: string;
  permissionDialogMessage?: string;
  buttonPositive?: string;
  checkAndroid6Permissions?: boolean;
  cameraProps?: RNCameraProps;
  cameraTimeout?: number;
  cameraTimeoutView?: JSX.Element;
  flashMode?: any;
  ref?: RefObject<QRCodeScanner>;
}

export interface QRCodeScannerState {
  scanning: boolean;
  isAuthorized: boolean;
  isCameraActivated: boolean;
  isAuthorizationChecked: boolean;
  disableVibrationByUser: boolean;
}

const CAMERA_FLASH_MODE = RNCamera.Constants.FlashMode;

export default class QRCodeScanner extends Component<
  QRCodeScannerProps,
  QRCodeScannerState
> {
  state: QRCodeScannerState = {
    scanning: false,
    isCameraActivated: true,
    isAuthorized: false,
    isAuthorizationChecked: false,
    disableVibrationByUser: false,
  };
  timer: any | null = null;
  _scannerTimeout: any | null = null;

  static defaultProps = {
    onRead: () => console.log('QR code scanned!'),
    reactivate: false,
    vibrate: true,
    reactivateTimeout: 0,
    cameraTimeout: 0,
    showMarker: false,
    cameraType: 'back',
    notAuthorizedView: (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
          }}>
          Camera not authorized
        </Text>
      </View>
    ),
    pendingAuthorizationView: (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 16,
          }}>
          ...
        </Text>
      </View>
    ),
    permissionDialogTitle: 'Info',
    permissionDialogMessage: 'Need camera permission',
    buttonPositive: 'OK',
    checkAndroid6Permissions: false,
    flashMode: CAMERA_FLASH_MODE.auto,
    cameraProps: {},
    cameraTimeoutView: (
      <View
        style={{
          flex: 0,
          alignItems: 'center',
          justifyContent: 'center',
          height: Dimensions.get('window').height,
          width: Dimensions.get('window').width,
          backgroundColor: 'black',
        }}>
        <Text style={{color: 'white'}}>Tap to activate camera</Text>
      </View>
    ),
  };

  constructor(props: QRCodeScannerProps) {
    super(props);
    this._handleBarCodeRead = this._handleBarCodeRead.bind(this);
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.CAMERA).then(cameraStatus => {
        this.setState({
          isAuthorized: cameraStatus === RESULTS.GRANTED,
          isAuthorizationChecked: true,
        });
      });
    } else if (
      Platform.OS === 'android' &&
      this.props.checkAndroid6Permissions
    ) {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
        title: this.props.permissionDialogTitle ?? '',
        message: this.props.permissionDialogMessage ?? '',
        buttonPositive: this.props.buttonPositive ?? '',
      }).then(granted => {
        const isAuthorized = granted === PermissionsAndroid.RESULTS.GRANTED;

        this.setState({isAuthorized, isAuthorizationChecked: true});
      });
    } else {
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({isAuthorized: true, isAuthorizationChecked: true});
    }
  }

  componentWillUnmount() {
    if (this._scannerTimeout !== null) {
      clearTimeout(this._scannerTimeout);
    }
    if (this.timer !== null) {
      clearTimeout(this.timer);
    }
    this.timer = null;
    this._scannerTimeout = null;
  }

  disable() {
    this.setState({disableVibrationByUser: true});
  }
  enable() {
    this.setState({disableVibrationByUser: false});
  }

  _setScanning(value: boolean) {
    this.setState({scanning: value});
  }

  _setCamera(value: boolean) {
    this.setState({
      isCameraActivated: value,
      scanning: false,
    });
  }

  _handleBarCodeRead(e: BarCodeReadEvent) {
    if (!this.state.scanning && !this.state.disableVibrationByUser) {
      this._setScanning(true);
      this.props.onRead(e);
      if (this.props.reactivate) {
        this._scannerTimeout = setTimeout(
          () => this._setScanning(false),
          this.props.reactivateTimeout,
        );
      }
    }
  }

  _renderTopContent() {
    if (this.props.topContent) {
      return this.props.topContent;
    }
    return null;
  }

  _renderBottomContent() {
    if (this.props.bottomContent) {
      return this.props.bottomContent;
    }
    return null;
  }

  _renderCameraMarker() {
    if (this.props.showMarker) {
      if (this.props.customMarker) {
        return this.props.customMarker;
      } else {
        return (
          <View style={styles.rectangleContainer}>
            <View
              style={[
                styles.rectangle,
                this.props.markerStyle ? this.props.markerStyle : null,
              ]}
            />
          </View>
        );
      }
    }
    return null;
  }

  _renderCameraComponent() {
    return (
      <RNCamera
        androidCameraPermissionOptions={{
          title: this.props.permissionDialogTitle ?? '',
          message: this.props.permissionDialogMessage ?? '',
          buttonPositive: this.props.buttonPositive,
        }}
        style={[styles.camera, this.props.cameraStyle]}
        onBarCodeRead={this._handleBarCodeRead.bind(this)}
        type={this.props.cameraType}
        flashMode={this.props.flashMode}
        captureAudio={false}
        {...this.props.cameraProps}>
        {this._renderCameraMarker()}
      </RNCamera>
    );
  }

  _renderCamera() {
    const {notAuthorizedView, pendingAuthorizationView, cameraTimeoutView} =
      this.props;

    if (!this.state.isCameraActivated) {
      return (
        <TouchableWithoutFeedback onPress={() => this._setCamera(true)}>
          {cameraTimeoutView}
        </TouchableWithoutFeedback>
      );
    }

    const {isAuthorized, isAuthorizationChecked} = this.state;
    if (isAuthorized) {
      if (this.props.cameraTimeout && this.props.cameraTimeout > 0) {
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(
          () => this._setCamera(false),
          this.props.cameraTimeout,
        );
      }

      return this._renderCameraComponent();
    } else if (!isAuthorizationChecked) {
      return pendingAuthorizationView;
    } else {
      return notAuthorizedView;
    }
  }

  reactivate() {
    this._setScanning(false);
  }

  render() {
    return (
      <View style={[styles.mainContainer, this.props.containerStyle]}>
        <View style={[styles.infoView, this.props.topViewStyle]}>
          {this._renderTopContent()}
        </View>
        <View style={this.props.cameraStyle}>{this._renderCamera()}</View>
        <View style={[styles.infoView, this.props.bottomViewStyle]}>
          {this._renderBottomContent()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  infoView: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },

  camera: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
});
