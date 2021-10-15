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
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  RowButton,
  RowContents,
  Name,
  Value,
  RowBorder,
  Arrow,
  ValueContainer,
} from './styles';
import {Route} from 'containers/routes';
import openURL from 'utils/openURL';

interface Props {
  name: string;
  value?: string;
  url?: string;
  screen?: Route;
}

const Row: FC<Props> = ({name, value, url, screen}) => {
  const navigation = useNavigation<any>();
  return (
    <RowButton
      accessibilityLabel={`${name}: ${value ?? ''}`}
      accessibilityRole="menuitem"
      onPress={() => {
        if (screen) {
          navigation.navigate(screen);
        } else if (url) {
          openURL(url, false, name);
        }
      }}>
      <View>
        <RowContents>
          <Name>{name}</Name>
          <ValueContainer>
            <Value>{value}</Value>
            <Arrow />
          </ValueContainer>
        </RowContents>
        <RowBorder />
      </View>
    </RowButton>
  );
};
export default Row;
