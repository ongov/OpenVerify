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
import React, {FC, useState, useContext, useCallback} from 'react';
import {Image, View} from 'react-native';
import useWhenChanged from 'utils/useWhenChanged';
import {RadioTouchableOpacity, RadioText} from './styles';
export interface RadioValueContextType {
  selectedValue?: string;
  onValueChange: (newValue: string) => void;
}

const RadioValueContext = React.createContext<RadioValueContextType>({
  onValueChange: () => {},
});

interface Props {
  name: string;
  value: string;
}

const RadioCircle = <Image source={require('assets/images/radio.svg')} />;
const RadioCircleSelected = (
  <Image source={require('assets/images/radio-selected.svg')} />
);

export const RadioChoice: FC<Props> = ({name, value}) => {
  const {selectedValue, onValueChange} = useContext(RadioValueContext);
  const selected = value === selectedValue;
  return (
    <RadioTouchableOpacity
      accessibilityRole="radio"
      accessibilityState={{selected}}
      onPress={() => onValueChange(value)}>
      {selected ? RadioCircleSelected : RadioCircle}
      <RadioText>{name}</RadioText>
    </RadioTouchableOpacity>
  );
};

interface RadioProps {
  currentValue?: string;
  onChange?: (newValue: string) => void;
  children?: React.ReactNode;
}

export const RadioGroup: FC<RadioProps> = ({
  children,
  currentValue,
  onChange,
}) => {
  const [selectedValue, setValue] = useState<string | undefined>(currentValue);
  // Update selectedValue to currentValue but only when currentValue changes
  useWhenChanged(cv => {
    if (cv !== selectedValue) {
      setValue(cv);
    }
  }, currentValue);
  const onValueChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      if (onChange) {
        onChange(newValue);
      }
    },
    [onChange],
  );
  return (
    <RadioValueContext.Provider value={{selectedValue, onValueChange}}>
      <View accessibilityRole="radiogroup">{children}</View>
    </RadioValueContext.Provider>
  );
};
