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

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.overlayColor};
`;

export const ModalProgressSubcontainer = styled.View`
  padding: ${({theme}) => theme.variables.spacing.xxlg - 4}px;
  justify-content: center;
  align-items: center;
  border-radius: ${({theme}) => theme.variables.roundness.md - 2}px;
  background-color: ${({theme}) => theme.colors.modalColor};
  margin-horizontal: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const ModalTitleText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansSemiBold};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.header4}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xmd}px;
  letter-spacing: ${({theme}) => theme.typography.letterSpacing.xs}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.sm}px;
  text-align: center;
`;

export const ModalBodyText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansSemiBold};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.body - 1}px;
  line-height: ${({theme}) => theme.typography.lineHeights.md}px;
  letter-spacing: ${({theme}) => theme.typography.letterSpacing.xs}px;
  font-weight: 400;
  text-align: center;
`;
