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

export const RowButton = styled.TouchableHighlight.attrs(({theme}) => ({
  activeOpactiy: 0.6,
  underlayColor: theme.colors.border,
}))`
  padding-horizontal: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const RowContents = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${({theme}) => theme.variables.spacing.md}px;
  padding-bottom: ${({theme}) => theme.variables.spacing.md + 1}px;
`;

export const RowBorder = styled.View`
  height: ${({theme}) => theme.variables.borders.xsm}px;
  background-color: ${({theme}) => theme.colors.border};
`;

export const Name = styled.Text.attrs(() => ({numberOfLines: 1}))`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  display: flex;
  text-align: left;
  padding-right: ${({theme}) => theme.variables.spacing.md - 1}px;
`;

export const Value = styled.Text.attrs(() => ({numberOfLines: 1}))`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  color: ${({theme}) => theme.colors.textSecondary};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  text-align: right;
`;

export const Arrow = styled.Image.attrs(() => ({
  source: require('assets/images/arrow.svg'),
  resizeMode: 'contain',
}))`
  margin-left: ${({theme}) => theme.variables.spacing.md - 1}px;
  height: ${({theme}) => theme.typography.fontSizes.body}px;
  width: ${({theme}) => theme.variables.sizes.xsm + 2}px;
  margin-top: ${({theme}) => theme.variables.spacing.xsm}px;
`;

export const ValueContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
`;
