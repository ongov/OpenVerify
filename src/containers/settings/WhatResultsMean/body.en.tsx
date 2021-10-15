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
import {Linking} from 'react-native';
import {Button} from 'components/core/button';
import {
  B,
  P,
  UL,
  LI,
  SubContainer,
  ResultDescription,
  ResultDescriptionLast,
  LinkText,
} from 'containers/settings/styles';
import {
  SuccessResult,
  WarningResult,
  ErrorResult,
} from 'components/results/result';
import useTelLink from 'utils/useTelLink';
import openURL from 'utils/openURL';
import {trackLogEvent} from 'utils/analytics';
import {verifyEvent} from 'config/analytics';

interface Props {
  screenReaderEnabled: boolean;
}

const BodyEn: FC<Props> = ({screenReaderEnabled}) => {
  const telLink = useTelLink('1-833-943-3900');

  return (
    <>
      <SubContainer>
        <P>This app verifies that:</P>
        <UL>
          <LI>a visitor’s QR code meets the Ontario requirements for entry</LI>
        </UL>
        <P>When the app scans a QR code, there are 3 possible results:</P>
        <UL>
          <LI>Verified</LI>
          <LI>There is a problem (includes third-party certificates)</LI>
          <LI>Invalid certificate</LI>
        </UL>
      </SubContainer>
      <SuccessResult />
      <ResultDescription>
        <P>
          This vaccine certificate <B>meets the Ontario requirements</B> for
          entry.
        </P>
      </ResultDescription>
      <WarningResult />
      <ResultDescription>
        <P>For example, the QR code may be:</P>
        <UL>
          <LI>
            issued by a province, territory or country that uses a different
            type of QR code
          </LI>
          <LI>
            made by a third-party service not associated with the government of
            Ontario
          </LI>
        </UL>
        <P>Staff can wipe their camera’s lens and try to scan again.</P>
        <P>Ask visitors to:</P>
        <UL>
          <LI>increase their screen brightness</LI>
          <LI>zoom in so the QR code takes up their whole screen</LI>
          <LI>avoid holding their QR code on an angle</LI>
          <LI>hold their QR code steady and at a short distance</LI>
        </UL>
        <P>
          Staff can also review the person’s paper certificate and a piece of
          identification instead.
        </P>
        <P>
          For more help, visit{' '}
          <LinkText
            onPress={() => {
              openURL(
                'https://www.ontario.ca/vaccine-proof-help',
                true,
                'Ontario.ca/vaccine-proof-help',
              );
            }}>
            Ontario.ca/vaccine-proof-help
          </LinkText>
        </P>
        {screenReaderEnabled && (
          <Button
            buttonType="secondary"
            onPress={() =>
              openURL(
                'https://www.ontario.ca/vaccine-proof-help',
                true,
                'Visit Ontario.ca/vaccine-proof-help',
              )
            }>
            Visit Ontario.ca/vaccine-proof-help
          </Button>
        )}
      </ResultDescription>
      <ErrorResult />
      <ResultDescriptionLast>
        <P>
          This vaccine certificate <B>does not meet the Ontario requirements</B>{' '}
          for entry.
        </P>
        <P>Staff should:</P>
        <UL>
          <LI>
            let the visitor know this certificate <B>can not</B> be accepted for
            entry
          </LI>
          <LI>
            ask if the visitor has a newer version of their government-issued
            vaccine certificate to try
          </LI>
          <LI>
            redirect a visitor to{' '}
            <LinkText
              onPress={() => {
                openURL(
                  'https://www.ontario.ca/verify-results',
                  true,
                  'Ontario.ca/verify-results',
                );
              }}>
              Ontario.ca/verify-results
            </LinkText>{' '}
            or{' '}
            {telLink ? (
              <LinkText
                onPress={() => {
                  trackLogEvent(verifyEvent.LINK_CLICK, {
                    outbound: true,
                    link_url: 'phone',
                    link_text: '1-833-943-3900',
                  });
                  Linking.openURL(telLink);
                }}>
                1-833-943-3900
              </LinkText>
            ) : (
              '1-833-943-3900'
            )}
          </LI>
        </UL>
        {telLink && screenReaderEnabled && (
          <Button
            buttonType="secondary"
            onPress={() => {
              trackLogEvent(verifyEvent.LINK_CLICK, {
                outbound: true,
                link_url: 'phone',
                link_text: 'Call 1-833-943-3900',
              });
              Linking.openURL(telLink);
            }}>
            Call 1-833-943-3900
          </Button>
        )}
      </ResultDescriptionLast>
    </>
  );
};
export default BodyEn;
