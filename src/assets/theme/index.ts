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

export type IColors = typeof Colors;
export type IVariables = typeof Variables;
export type ITypography = typeof Typography;

export type ITheme = {
  dark: boolean;
  colors: IColors;
  variables: IVariables;
  typography: ITypography;
};

export {useTheme, getTheme} from './utils';
