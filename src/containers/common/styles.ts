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
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  background-color: ${({theme}) => theme.colors.background};
`;

export const Scroll = styled.ScrollView``;

export const SubContainer = styled.View`
  padding-horizontal: ${({theme}) => theme.variables.spacing.lg}px;
  padding-bottom: ${({theme}) => theme.variables.spacing.xxxlg}px;
`;

export const TitleText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.ralewayBold};
  letter-spacing: ${({theme}) => theme.typography.letterSpacing.title}px;
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.header2}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xlg}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.xmd}px;
  margin-top: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const SubtitleText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.ralewayRegular};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const Spacing = styled.View`
  height: ${({theme}) => theme.variables.spacing.xsm}px;
`;
