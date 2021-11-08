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
import React, {ReactElement} from 'react';
import {AccessibilityState, StyleProp, ViewStyle} from 'react-native';

import {
  PrimaryButtonContainer,
  SecondaryButtonContainer,
  TertiaryButtonContainer,
  FlashlightButtonContainer,
  PrimaryButtonText,
  SecondaryButtonText,
  TertiaryButtonText,
  FlashlightButtonText,
  ButtonType,
} from './styles';

export interface Props {
  children: string;
  disabled?: boolean;
  onPress: () => void;
  icon?: ReactElement;
  buttonType?: ButtonType;
  style?: StyleProp<ViewStyle>;
  accessibilityState?: AccessibilityState;
  accessibilityLabel?: string;
  selected?: boolean;
}

export const Button = ({
  children: title,
  disabled = false,
  icon,
  onPress,
  buttonType = 'primary',
  style,
  accessibilityState,
  accessibilityLabel,
  selected,
}: Props) => {
  switch (buttonType) {
    case 'primary':
      return (
        <PrimaryButtonContainer
          onPress={onPress}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{disabled, ...accessibilityState}}
          accessibilityLabel={accessibilityLabel}
          style={style}>
          {icon && icon}
          <PrimaryButtonText>{title}</PrimaryButtonText>
        </PrimaryButtonContainer>
      );
    case 'secondary':
      return (
        <SecondaryButtonContainer
          onPress={onPress}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{disabled, ...accessibilityState}}
          accessibilityLabel={accessibilityLabel}
          style={style}>
          {icon && icon}
          <SecondaryButtonText>{title}</SecondaryButtonText>
        </SecondaryButtonContainer>
      );
    case 'tertiary':
      return (
        <TertiaryButtonContainer
          onPress={onPress}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{disabled, ...accessibilityState}}
          accessibilityLabel={accessibilityLabel}
          style={style}>
          {icon && icon}
          <TertiaryButtonText>{title}</TertiaryButtonText>
        </TertiaryButtonContainer>
      );
    case 'flashlight':
      return (
        <FlashlightButtonContainer
          onPress={onPress}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityState={{disabled, ...accessibilityState}}
          accessibilityLabel={accessibilityLabel}
          style={style}
          $selected={selected}>
          {icon && icon}
          <FlashlightButtonText $selected={selected}>
            {title}
          </FlashlightButtonText>
        </FlashlightButtonContainer>
      );
  }
};
