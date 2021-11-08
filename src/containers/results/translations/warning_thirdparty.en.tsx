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
import {Button} from 'components/core/button';
import {P, UL, LI, LinkText, TitleText} from 'containers/results/styles';
import openURL from 'utils/openURL';

interface Props {
  screenReaderEnabled: boolean;
}

const WarningThirdPartyEn: FC<Props> = ({screenReaderEnabled}) => {
  return (
    <>
      <TitleText>
        This certificate was created using a third-party tool and can not be
        used for entry.
      </TitleText>
      <P>What to do next:</P>
      <UL>
        <LI>ask the visitor to show a government-issued vaccine certificate</LI>
        <LI>
          let the visitor know that enhanced vaccine certificates with a
          government-issued QR code are available to download at{' '}
          <LinkText
            onPress={() => {
              openURL(
                'https://www.ontario.ca/getproof',
                true,
                'ontario.ca/getproof',
              );
            }}>
            ontario.ca/getproof
          </LinkText>
        </LI>
      </UL>
      {screenReaderEnabled && (
        <Button
          buttonType="secondary"
          onPress={() =>
            openURL(
              'https://www.ontario.ca/getproof',
              true,
              'Visit ontario.ca/getproof',
            )
          }>
          Visit ontario.ca/getproof
        </Button>
      )}
    </>
  );
};
export default WarningThirdPartyEn;
