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

export const MainContainer = styled.SafeAreaView`
  background-color: ${({theme}) => theme.colors.background};
  shadow-radius: 0;
  shadow-offset: 0 0;
  elevation: 0;
  border-bottom-width: 0;
  min-height: 116px;
`;

export const OpenVerifyLogo = styled.Image.attrs(() => ({
  source: require('assets/images/openverify_base_logo.svg'),
}))`
  margin-top: ${({theme}) => theme.variables.spacing.lg - 3}px;
  margin-left: ${({theme}) => theme.variables.spacing.xsm - 1}px;
`;

export const OpenVerifyLogoDark = styled.Image.attrs(() => ({
  source: require('assets/images/openverify_base_logo_dark.svg'),
}))`
  margin-top: ${({theme}) => theme.variables.spacing.lg - 3}px;
  margin-left: ${({theme}) => theme.variables.spacing.xsm - 1}px;
`;

export const LogoSpacing = styled.View`
  height: ${({theme}) => theme.variables.borders.xsm}px;
  background-color: ${({theme}) => theme.colors.border};
`;
