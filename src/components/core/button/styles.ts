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

export type ButtonType = 'primary' | 'secondary' | 'tertiary' | 'flashlight';

export const ButtonContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  border-radius: ${({theme}) => theme.variables.roundness.xxsm}px;
  padding: ${({theme}) => theme.variables.spacing.md}px;
  padding-top: ${({theme}) => theme.variables.spacing.md - 1}px;
  margin-vertical: ${({theme}) => theme.variables.spacing.xsm}px;
  align-items: center;
`;

export const PrimaryButtonContainer = styled(ButtonContainer)`
  border-color: ${props =>
    props.disabled
      ? props.theme.colors.disabled
      : props.theme.colors.primaryButtonColor};
  background-color: ${props =>
    props.disabled
      ? props.theme.colors.disabled
      : props.theme.colors.primaryButtonColor};
`;

export const SecondaryButtonContainer = styled(ButtonContainer)`
  border-color: ${({theme}) => theme.colors.primaryButtonColor};
  border-width: ${({theme}) => theme.variables.borders.md}px;
  padding: ${({theme}) => theme.variables.spacing.md - 2}px;
  background-color: ${({theme}) => theme.colors.background};
`;

export const TertiaryButtonContainer = styled(ButtonContainer)`
  background-color: transparent;
`;

interface SelectedProps {
  readonly $selected?: boolean;
}

export const FlashlightButtonContainer = styled.TouchableOpacity<SelectedProps>`
  flex-direction: row;
  background-color: ${({$selected, theme}) =>
    $selected ? theme.colors.white : 'transparent'};
  border-color: ${({theme}) => theme.colors.white};
  border-width: ${({theme}) => theme.variables.borders.md}px;
  padding-right: ${({theme}) => theme.variables.spacing.xmd}px;
  border-radius: ${({theme}) => theme.variables.roundness.xxsm}px;
  padding-horizontal: ${({theme}) => theme.variables.spacing.xsm + 2}px;
`;

export const ButtonText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansSemiBold};
  font-size: ${({theme}) => theme.typography.fontSizes.regular}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xmd}px;
  text-align: center;
`;

export const PrimaryButtonText = styled(ButtonText)`
  color: ${({theme}) => theme.colors.white};
`;

export const SecondaryButtonText = styled(ButtonText)`
  color: ${({theme}) => theme.colors.secondaryButtonTextColor};
`;

export const TertiaryButtonText = styled(ButtonText)`
  color: ${({theme}) => theme.colors.tertiaryButtonTextColor};
  text-decoration-line: underline;
`;

export const FlashlightButtonText = styled(ButtonText)<SelectedProps>`
  color: ${({$selected, theme}) =>
    $selected ? theme.colors.black : theme.colors.white};
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
`;
