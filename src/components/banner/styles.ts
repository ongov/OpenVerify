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
import {SafeAreaView} from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
  padding: ${({theme}) => theme.variables.spacing.xmd}px;
  background-color: ${({theme}) => theme.colors.warningYellow};
`;

export const ContentView = styled.View`
  flex-direction: row;
`;

export const BodyText = styled.Text`
  flex-shrink: 1;
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  color: ${({theme}) => theme.colors.bannerText};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.h4}px;
  margin-left: ${({theme}) => theme.variables.spacing.xmd}px;
`;

export const B = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansBold};
`;
