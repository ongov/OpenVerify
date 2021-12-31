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
import {P, UL, LI, LinkText, TitleText} from 'containers/results/styles';
import openURL from 'utils/openURL';
import useTelLink from 'utils/useTelLink';
import {trackLogEvent} from 'utils/analytics';
import {verifyEvent} from 'config/analytics';
import {shouldAllowPaperVaccineProof} from 'utils/rulesHelper';

interface Props {
  screenReaderEnabled: boolean;
}

const WarningEn: FC<Props> = ({screenReaderEnabled}) => {
  const telLink = useTelLink('1-833-943-3900');
  const isPaperProofAllowed = shouldAllowPaperVaccineProof();

  return (
    <>
      <TitleText>
        There may be a technical issue with this certificate.
      </TitleText>
      <P>For example, the QR code may be:</P>
      <UL>
        <LI>
          issued to a child under age 12 or turned 12 within the last 12 weeks
          (84 days)
        </LI>
        <LI>
          issued by a province, territory or country that uses a different type
          of QR code
        </LI>
        <LI>
          made by a third-party service not associated with the Government of
          Ontario
        </LI>
      </UL>
      <P>What to do next:</P>
      <UL>
        <LI>
          allow entry for children under age 12 or who turned 12 within the last
          12 weeks (84 days). They do not have to show proof of vaccination
        </LI>
        {isPaperProofAllowed && (
          <LI>
            review the visitor’s government-issued paper or digital vaccine
            certificate and a piece of identification
          </LI>
        )}
        <LI>
          redirect the visitor to{' '}
          <LinkText
            onPress={() => {
              openURL(
                'https://www.ontario.ca/vaccine-proof-help',
                true,
                'ontario.ca/vaccine-proof-help',
              );
            }}>
            ontario.ca/vaccine-proof-help
          </LinkText>{' '}
          for result details and tell them they can call for extra help{' '}
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
      {screenReaderEnabled && (
        <Button
          buttonType="secondary"
          onPress={() =>
            openURL(
              'https://www.ontario.ca/vaccine-proof-help',
              true,
              'Visit ontario.ca/vaccine-proof-help',
            )
          }>
          Visit ontario.ca/vaccine-proof-help
        </Button>
      )}
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
    </>
  );
};
export default WarningEn;
