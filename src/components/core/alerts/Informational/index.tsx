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
import {Image} from 'react-native';
import {
  TitleView,
  TitleText,
  SubContainer,
  StripeView,
  ChildMargin,
} from '../styles';
import styled from 'styled-components/native';

export const InformationSubContainer = styled(SubContainer)`
  background-color: ${({theme}) => theme.colors.informationLightBlue};
`;

export const InformationStripeView = styled(StripeView)`
  background-color: ${({theme}) => theme.colors.informationBlue};
`;

interface Props {
  title: string;
  children?: React.ReactNode;
}

const InformationPageAlert: FC<Props> = ({children, title}) => (
  <InformationSubContainer>
    <InformationStripeView />
    <TitleView>
      <Image source={require('assets/images/information_icon.svg')} />
      <TitleText>{title}</TitleText>
    </TitleView>
    <ChildMargin>{children}</ChildMargin>
  </InformationSubContainer>
);
export default InformationPageAlert;
