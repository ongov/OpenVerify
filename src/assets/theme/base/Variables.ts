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
import {PixelRatio} from 'react-native';

export const Variables = {
  borders: {
    xsm: 1 / PixelRatio.get(),
    sm: 1,
    md: 2,
  },
  roundness: {
    xxsm: 4,
    xsm: 6,
    sm: 8,
    md: 16,
    xmd: 20,
    lg: 24,
    xlg: 32,
  },
  spacing: {
    xsm: 4,
    sm: 8,
    md: 12,
    xmd: 20,
    lg: 24,
    xlg: 32,
    xxlg: 40,
    xxxlg: 48,
  },
  sizes: {
    xxsm: 4,
    xsm: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xlg: 40,
    xxlg: 48,
    xxxlg: 60,
  },
};
