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

export const TitleView = styled.View`
  margin-horizontal: ${({theme}) => -theme.variables.spacing.xmd}px;
  flex-direction: row;
`;

export const TitleText = styled.Text.attrs(() => ({
  accessibilityRole: 'header',
}))`
  font-family: ${({theme}) => theme.typography.fonts.ralewayBold};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.header4}px;
  line-height: ${({theme}) => theme.typography.lineHeights.h4}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.lg}px;
  margin-top: ${({theme}) => theme.variables.spacing.lg}px;
  flex-shrink: 1;
`;

export const SubtitleText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  flex-shrink: 1;
  text-align: right;
`;

export const Padding = styled.View`
  height: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const LinkText = styled.Text`
  color: ${({theme}) => theme.colors.linkColor};
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: ${({theme}) => theme.colors.linkColor};
`;

export const StripeView = styled.View`
  width: ${({theme}) => theme.variables.sizes.xxsm}px;
  height: 100%;
  position: absolute;
  padding-bottom: ${({theme}) => -theme.variables.spacing.lg}px;
`;

export const SubContainer = styled.View`
  padding-horizontal: ${({theme}) => theme.variables.spacing.xmd}px;
`;

export const ChildMargin = styled.View`
  margin-horizontal: ${({theme}) => theme.variables.spacing.xsm}px;
`;

export const HeadingContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({theme}) => theme.variables.spacing.md + 2}px;
`;

export const HeadingText = styled.Text.attrs(() => ({
  accessibilityRole: 'header',
}))`
  font-family: ${({theme}) => theme.typography.fonts.ralewayBold};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  margin-right: ${({theme}) => theme.variables.spacing.md}px;
`;
