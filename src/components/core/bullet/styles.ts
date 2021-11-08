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
import {Platform} from 'react-native';
import styled from 'styled-components/native';

export const BulletContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  flex-shrink: 1;
`;

export const BulletTextBullet = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) =>
    Platform.OS === 'android'
      ? theme.typography.fontSizes.androidBullet
      : theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  margin-left: ${({theme}) => theme.variables.spacing.sm}px;
  margin-right: ${({theme}) => theme.variables.spacing.sm}px;
`;

export const BulletText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  flex: 1;
`;
