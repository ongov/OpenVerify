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

export const MainContainer = styled.View`
  padding-top: 45px;
  padding-bottom: 24px;
  align-items: center;
`;

export const SuccessContainer = styled(MainContainer)`
  background-color: ${({theme}) => theme.colors.successGreen};
`;

export const ErrorContainer = styled(MainContainer)`
  background-color: ${({theme}) => theme.colors.alertRed};
`;

export const WarningContainer = styled(MainContainer)`
  background-color: ${({theme}) => theme.colors.warningYellow};
`;

export const TimeoutContainer = styled(MainContainer)`
  background-color: ${({theme}) => theme.colors.timeoutBackground};
`;

export const SuccessIcon = styled.Image.attrs(() => ({
  source: require('assets/images/verified.svg'),
}))`
  margin-bottom: 35px;
`;

export const ErrorIcon = styled.Image.attrs(() => ({
  source: require('assets/images/unverified.svg'),
}))`
  margin-bottom: 24px;
`;

export const WarningIcon = styled.Image.attrs(() => ({
  source: require('assets/images/warning.svg'),
}))`
  margin-bottom: 14px;
`;

export const TimeoutIcon = styled.Image.attrs(({theme}) => ({
  source: theme.dark
    ? require('assets/images/timeout_dark.svg')
    : require('assets/images/timeout.svg'),
}))`
  margin-bottom: 14px;
`;

export const AlertText = styled.Text.attrs({
  accessibilityRole: 'header',
})`
  color: ${({theme}) => theme.colors.white};
  font-family: ${({theme}) => theme.typography.fonts.ralewayBold};
  font-size: ${({theme}) => theme.typography.fontSizes.header3}px;
  line-height: ${({theme}) => theme.typography.lineHeights.h3}px;
  text-align: center;
`;

export const WarningText = styled(AlertText)`
  color: ${({theme}) => theme.colors.black};
`;

export const TimeoutText = styled(AlertText)`
  color: ${({theme}) => theme.colors.timeoutText};
`;
