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
import {shouldAllowPaperVaccineProof} from 'utils/rulesHelper';
import {verifyEvent} from 'config/analytics';

interface Props {
  screenReaderEnabled: boolean;
}

const WarningFr: FC<Props> = ({screenReaderEnabled}) => {
  const telLink = useTelLink('1-833-943-3900');
  const isPaperProofAllowed = shouldAllowPaperVaccineProof();

  return (
    <>
      <TitleText>
        Il peut y avoir un problème technique avec ce certificat.
      </TitleText>
      <P>Par exemple, le code QR a pu être{' '}:</P>
      <UL>
        <LI>
          délivré à un enfant de moins de 12 ans ou qui vient d’avoir 12 ans au
          cours des 12 dernières semaines (84 jours)
        </LI>
        <LI>
          délivré par une province, un territoire ou un pays qui utilise un
          autre type de code QR
        </LI>
        <LI>
          délivré par un service tierce non associé au gouvernement de l’Ontario
        </LI>
      </UL>
      <P>Ce qu’il faut faire ensuite{' '}:</P>
      <UL>
        <LI>
          laissez entrer les enfants de moins de 12 ans ou qui viennent d’avoir
          12 ans au cours des 12 dernières semaines (84 jours). Ils n’ont pas à
          fournir de preuve de vaccination
        </LI>
        {isPaperProofAllowed && (
          <LI>
            examinez le certificat de vaccination papier ou numérique délivrés
            par le gouvernement ainsi qu’une pièce d'identité du visiteur
          </LI>
        )}
        <LI>
          réacheminez le visiteur vers{' '}
          <LinkText
            onPress={() => {
              openURL(
                'https://www.ontario.ca/aide-preuve-vaccination',
                true,
                'ontario.ca/aide-preuve-vaccination',
              );
            }}>
            ontario.ca/aide-preuve-vaccination
          </LinkText>{' '}
          pour obtenir des détails sur les résultats et lui dire qu’il peut
          appeler pour obtenir une aide supplémentaire au{' '}
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
              'https://www.ontario.ca/aide-preuve-vaccination',
              true,
              'Visitez le site ontario.ca/aide-preuve-vaccination',
            )
          }>
          Visitez le site ontario.ca/aide-preuve-vaccination
        </Button>
      )}
      {telLink && screenReaderEnabled && (
        <Button
          buttonType="secondary"
          onPress={() => {
            trackLogEvent(verifyEvent.LINK_CLICK, {
              outbound: true,
              link_url: 'phone',
              link_text: 'Composer le 1-833-943-3900',
            });
            Linking.openURL(telLink);
          }}>
          Composer le 1-833-943-3900
        </Button>
      )}
    </>
  );
};
export default WarningFr;
