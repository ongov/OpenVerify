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
import React from 'react';
import {
  TitleText,
  SubtitleText,
  B,
  LinkText,
} from 'containers/onboarding/styles';
import useForwardedRef from 'utils/useForwardedRef';
import openURL from 'utils/openURL';
import {Button} from 'components/core/button';

interface Props {
  screenReaderEnabled?: any;
}

const BodyEn = React.forwardRef<any, React.PropsWithChildren<Props>>(
  (props, forwardedRef) => {
    const {screenReaderEnabled} = props;
    const focusRef = useForwardedRef(forwardedRef);
    return (
      <>
        <TitleText ref={focusRef}>
          Open Verify is an app for businesses and organizations
        </TitleText>
        <SubtitleText>
          Open Verify provides a quick, easy and secure way to scan and confirm
          that a visitor’s enhanced vaccine certificate with official QR code
          meets the Ontario requirements for entry.
        </SubtitleText>
        <SubtitleText>
          <B>
            The app is not for storing or downloading your proof of vaccination.
          </B>
        </SubtitleText>
        <SubtitleText>
          To download your enhanced vaccine certificate with official QR code,
          please visit{' '}
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
          .
        </SubtitleText>
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
  },
);

export default BodyEn;
