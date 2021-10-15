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
import React, {FC} from 'react';
import {StyleProp, TextStyle, TouchableOpacity} from 'react-native';
import {LinkText} from './styles';
import openURL from 'utils/openURL';

interface Props {
  url: string;
  children: string;
  modal?: boolean;
  style?: StyleProp<TextStyle>;
}

const Link: FC<Props> = ({url, children, style, modal = true}) => (
  <TouchableOpacity
    onPress={() => {
      openURL(url, modal, children);
    }}
    accessibilityRole="link">
    <LinkText style={style}>{children}</LinkText>
  </TouchableOpacity>
);
export default Link;
