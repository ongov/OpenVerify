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
import styled from 'styled-components/native';
import QRCodeScanner from 'components/scanner/QRCodeScanner';
import {Button} from 'components/core/button';
import {ITheme} from 'assets/theme';

type CameraOverlayProps = {
  theme: ITheme;
  cameraHeight?: number;
  cameraWidth?: number;
};

export const MainContainer = styled.SafeAreaView`
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  width: 100%;
  background-color: ${({theme}) => theme.colors.backgroundColor};
`;

export const CameraContainer = styled.View`
  height: 100%;
  width: 100%
  align-items: flex-start;
`;

export const Scroll = styled.ScrollView``;

export const SubContainer = styled.View`
  padding-horizontal: ${({theme}) => theme.variables.spacing.lg}px;
  padding-bottom: ${({theme}) => theme.variables.spacing.xxxlg}px;
`;

export const BottomContainer = styled.View`
  padding-horizontal: ${({theme}) => theme.variables.spacing.lg}px;
  padding-bottom: ${({theme}) => theme.variables.spacing.xmd}px;
`;

export const TitleText = styled.Text.attrs(() => ({
  accessibilityRole: 'header',
}))`
  font-family: ${({theme}) => theme.typography.fonts.ralewayBold};
  letter-spacing: ${({theme}) => theme.typography.letterSpacing.title}px;
  color: ${({theme}) => theme.colors.textColor};
  font-size: ${({theme}) => theme.typography.fontSizes.header2}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xlg}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.xmd}px;
  margin-top: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const SubtitleText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.ralewayRegular};
  color: ${({theme}) => theme.colors.textColor};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const SubtitleTextBold = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.ralewayBold};
`;

export const HomeButton = styled(Button)`
  margin-bottom: ${({theme}) => theme.variables.spacing.sm}px;
`;
export const HomePolicyButton = styled(Button)`
  margin-bottom: ${({theme}) => theme.variables.spacing.xsm}px;
`;

export const ButtonText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  margin-left: ${({theme}) => theme.variables.spacing.xsm}px;
`;

const DefaultQRCodeScanner = styled(QRCodeScanner)``;

export const OpenVerifyQRCodeScanner = styled(DefaultQRCodeScanner).attrs(
  props => ({
    cameraStyle: {
      height: '100%',
      width: '100%',
      position: 'absolute',
    },
    backgroundColor: props.theme.colors.white,
  }),
)``;

export const TorchImage = styled.Image.attrs(() => ({
  source: require('assets/images/torch.svg'),
}))`
  margin: ${({theme}) => theme.variables.spacing.md}px;
`;

export const Spacing = styled.View`
  height: ${({theme}) => theme.variables.spacing.sm}px;
`;

export const BorderSpacing = styled.View`
  height: ${({theme}) => theme.variables.borders.sm}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.xmd}px;
  background-color: ${({theme}) => theme.colors.spacingBackgroundColor};
`;

export const CloseImage = styled.Image.attrs(() => ({
  source: require('assets/images/openverify-icon-close.svg'),
}))`
  margin-top: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const WarningImage = styled.Image.attrs(() => ({
  source: require('assets/images/openverify-icon-alert-warning.svg'),
}))`
  margin-top: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const ErrorImage = styled.Image.attrs(() => ({
  source: require('assets/images/openverify-icon-alert-error.svg'),
}))`
  margin-top: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const WarningSmallImage = styled.Image.attrs(() => ({
  source: require('assets/images/openverify-icon-alert-warning.svg'),
}))`
  margin-right: ${({theme}) => theme.variables.spacing.md}px;
  width: 24px;
  height: 24px;
`;

export const ErrorSmallImage = styled.Image.attrs(() => ({
  source: require('assets/images/openverify-icon-alert-error.svg'),
}))`
  margin-right: ${({theme}) => theme.variables.spacing.md}px;
  width: 24px;
  height: 24px;
`;

export const TopCameraOverlay = styled.View<CameraOverlayProps>`
  width: 100%;
  height: ${({cameraHeight}) => (cameraHeight ?? 0) / 2 - 133}px;
  align-self: flex-start;
  background-color: ${({theme}) => theme.colors.opaqueGrey};
  position: absolute;
  top: 0;
`;

export const CentreCameraView = styled.View<CameraOverlayProps>`
  width: 100%;
  height: 266px;
  align-self: center;
  background-color: transparent;
  position: absolute;
  top: ${({cameraHeight}) => (cameraHeight ?? 0) / 2 - 133}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const LeftRightCameraOverlay = styled.View<CameraOverlayProps>`
  width: ${({cameraWidth}) => (cameraWidth ?? 0) / 2 - 133}px;
  height: 100%;
  background-color: ${({theme}) => theme.colors.opaqueGrey};
`;

export const BottomCameraOverlay = styled.View<CameraOverlayProps>`
  width: 100%;
  height: ${({cameraHeight}) => (cameraHeight ?? 0) / 2 - 133}px;
  align-self: flex-end;
  background-color: ${({theme}) => theme.colors.opaqueGrey};
  position: absolute;
  bottom: 0;
`;

export const Logo = styled.Image.attrs(() => ({
  source: require('assets/images/openverify_camera_logo.svg'),
}))<CameraOverlayProps>`
  align-self: center;
  position: absolute;
  top: ${({cameraHeight}) => (cameraHeight ?? 0) / 2 - 200}px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.overlayColor};
`;

export const ModalProgressSubcontainer = styled.View`
  padding: ${({theme}) => theme.variables.spacing.xxlg - 1}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.variables.roundness.md - 2}px;
  background-color: ${({theme}) => theme.colors.modalColor};
  margin-horizontal: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const ModalSubcontainer = styled.View`
  width: 75%;
  padding-top: ${({theme}) => theme.variables.spacing.xmd - 1}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.variables.roundness.md - 2}px;
  background-color: ${({theme}) => theme.colors.modalColor};
`;

export const ModalBorderSpacing = styled.View`
  width: 300px;
  height: ${({theme}) => theme.variables.borders.xsm}px;
  margin-top: ${({theme}) => theme.variables.spacing.md}px;
  background-color: ${({theme}) => theme.colors.modalBorder};
`;

export const ModalVerticalBorderSpacing = styled.View`
  height: 100%;
  width: ${({theme}) => theme.variables.borders.xsm}px;
  background-color: ${({theme}) => theme.colors.modalBorder};
`;

export const ModalTitleText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansSemiBold};
  color: ${({theme}) => theme.colors.textColor};
  font-size: ${({theme}) => theme.typography.fontSizes.body + 1}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xmd}px;
  letter-spacing: ${({theme}) => theme.typography.letterSpacing.xs}px;
  text-align: center;
`;

export const ModalSubtitleText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  color: ${({theme}) => theme.colors.textColor};
  font-size: ${({theme}) => theme.typography.fontSizes.caption + 1}px;
  line-height: ${({theme}) => theme.typography.lineHeights.md}px;
  letter-spacing: ${({theme}) => theme.typography.letterSpacing.xxs}px;
  padding-top: ${({theme}) => theme.variables.spacing.sm}px;
  padding-horizontal: ${({theme}) => theme.variables.spacing.xlg}px;
  text-align: center;
`;

export const ModalSingleButton = styled.TouchableOpacity`
  width: 100%;
  padding-vertical: ${({theme}) => theme.variables.spacing.md}px;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const ModalButton = styled.TouchableOpacity`
  width: 50%;
  padding-vertical: ${({theme}) => theme.variables.spacing.md}px;
`;

export const ModalButtonText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansSemiBold};
  color: ${({theme}) => theme.colors.primary};
  font-size: ${({theme}) => theme.typography.fontSizes.body + 1}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xmd}px;
  letter-spacing: ${({theme}) => theme.typography.letterSpacing.xs}px;
  text-align: center;
`;

export const ModalButtonRegularText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
`;

export const FlashlightButton = styled(Button)`
  position: absolute;
  bottom: 20%;
  align-self: center;
  align-items: center;
`;

export const QRScannerFocus = styled.Image.attrs(() => ({
  source: require('assets/images/QRScannerFocus.png'),
}))`
  height: 266px;
  width: 266px;
`;

export const ScannerTitleText = styled.Text`
  position: absolute;
  top: 0;
  width: 100%;
  font-family: ${({theme}) => theme.typography.fonts.ralewayRegular};
  color: ${({theme}) => theme.colors.white};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  text-align: center;
`;
