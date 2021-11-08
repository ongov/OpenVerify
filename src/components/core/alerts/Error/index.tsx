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
import {Image, StyleProp, ViewProps} from 'react-native';
import {
  TitleView,
  TitleText,
  SubContainer,
  StripeView,
  ChildMargin,
} from '../styles';
import styled from 'styled-components/native';

export const AlertSubContainer = styled(SubContainer)`
  background-color: ${({theme}) => theme.colors.alertLightRed};
  margin-top: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const AlertStripeView = styled(StripeView)`
  background-color: ${({theme}) => theme.colors.alertRed};
`;

interface Props {
  title?: string;
  children?: React.ReactNode;
  style?: StyleProp<ViewProps>;
}

const FailurePageAlert: FC<Props> = ({title, children, style}) => (
  <AlertSubContainer style={style}>
    <AlertStripeView />
    <TitleView>
      <Image source={require('assets/images/error_icon.svg')} />
      <TitleText>{title}</TitleText>
    </TitleView>
    <ChildMargin>{children}</ChildMargin>
  </AlertSubContainer>
);

export default FailurePageAlert;
