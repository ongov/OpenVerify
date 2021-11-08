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
import {Typography} from './base/Typography';
import {Variables} from './base/Variables';
import {Colors} from './base/Colors';
import {ITheme} from './';

export const Theme: ITheme = {
  dark: true,
  typography: Typography,
  variables: Variables,
  colors: {
    ...Colors,
    primary: '#FFFFFF', // react-navigation
    text: '#FFFFFF',
    background: '#000000',
    card: '#000000',
    checkBoxFillColor: '#000000',
    checkBoxCheckColor: '#FFFFFF',
    secondaryButtonTextColor: '#FFFFFF',
    linkColor: '#C2E0FF',
    checkBoxTintColor: '#FFFFFF',
    border: '#4D4D4D',
    timeoutText: '#FFFFFF',
    timeoutBackground: '#4D4D4D',
    textSecondary: '#FFFFFF',
    tertiaryButtonTextColor: '#FFFFFF',
    modalColor: '#1A1A1A',
    alertLightRed: '#502225',
    warningLightYellow: '#443D24',
  },
};
