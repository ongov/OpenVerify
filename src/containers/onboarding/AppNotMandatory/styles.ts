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
import {Button} from 'components/core/button';

export const LearMoreButton = styled(Button)`
  margin-top: ${({theme}) => theme.variables.spacing.sm}px;
`;

export const WarningImage = styled.Image.attrs(() => ({
  source: require('assets/images/openverify-icon-alert-warning.svg'),
}))`
  margin-top: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const B = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansBold};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.lg}px;
  color: ${({theme}) => theme.colors.text};
`;
