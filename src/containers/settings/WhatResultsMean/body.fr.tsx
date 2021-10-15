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

const BodyFr: FC<Props> = ({screenReaderEnabled}) => {
  const telLink = useTelLink('1-833-943-3900');

  return (
    <>
      <SubContainer>
        <P>Cette application permet de vérifier que{'\u00a0'}:</P>
        <UL>
          <LI>
            le code QR d’un visiteur répond aux exigences de l’Ontario
            concernant les conditions d’entrée
          </LI>
        </UL>
        <P>
          Lorsque l’application numérise un code QR, il y a trois résultats
          possibles{'\u00a0'}:
        </P>
        <UL>
          <LI>Vérifié</LI>
          <LI>
            Il y a un problème (y compris les certificats de tierces parties)
          </LI>
          <LI>Certificat invalide</LI>
        </UL>
      </SubContainer>
      <SuccessResult />
      <ResultDescription>
        <P>
          Ce certificat de vaccination <B>répond aux exigences</B> de l’Ontario.
        </P>
      </ResultDescription>
      <WarningResult />
      <ResultDescription>
        <P>Par exemple, le code QR peut être{'\u00a0'}:</P>
        <UL>
          <LI>
            délivré par une province, un territoire ou un pays qui utilise un
            autre type de code QR
          </LI>
          <LI>
            délivré par un service tierce non associé au gouvernement de
            l’Ontario
          </LI>
        </UL>
        <P>
          Le personnel peut nettoyer l'objectif de son appareil photo et essayer
          de numériser à nouveau.
        </P>
        <P>Proposez aux visiteurs de{'\u00a0'}:</P>
        <UL>
          <LI>augmenter la luminosité de l’écran</LI>
          <LI>
            rapprocher l’image pour que le code QR occupe la totalité de l’écran
          </LI>
          <LI>éviter de saisir leur code QR dans un angle</LI>
          <LI>tenir leur code QR de manière stable et à une courte distance</LI>
        </UL>
        <P>
          Le personnel peut également examiner le certificat papier et une pièce
          d'identité de la personne.
        </P>
        <P>
          Pour plus d’aide, visitez le site{' '}
          <LinkText
            onPress={() => {
              openURL(
                'https://www.ontario.ca/aide-preuve-vaccination',
                true,
                'Ontario.ca/aide-preuve-vaccination',
              );
            }}>
            Ontario.ca/aide-preuve-vaccination
          </LinkText>
        </P>
        {screenReaderEnabled && (
          <Button
            buttonType="secondary"
            onPress={() =>
              openURL(
                'https://www.ontario.ca/aide-preuve-vaccination',
                true,
                'Composer le Ontario.ca/aide-preuve-vaccination',
              )
            }>
            Composer le Ontario.ca/aide-preuve-vaccination
          </Button>
        )}
      </ResultDescription>
      <ErrorResult />
      <ResultDescriptionLast>
        <P>
          Le certificat ou le code{' '}
          <B>ne répond pas aux exigences actuelles de l’Ontario</B>.
        </P>
        <P>Le personnel peut{'\u00a0'}:</P>
        <UL>
          <LI>
            avertir la personne que ce certificat <B>ne peut pas</B> être
            utilisé pour entrer au site
          </LI>
          <LI>
            demander à la personne si elle a une version plus récente de son
            certificat de vaccination émis par le gouvernement pour essayer de
            le numériser
          </LI>
          <LI>
            réacheminer la personne vers{' '}
            <LinkText
              onPress={() => {
                openURL(
                  'https://www.ontario.ca/verif-resultats',
                  true,
                  'Ontario.ca/verif-resultats',
                );
              }}>
              Ontario.ca/verif-resultats
            </LinkText>{' '}
            ou le{' '}
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
            )}{' '}
          </LI>
        </UL>
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
      </ResultDescriptionLast>
    </>
  );
};
export default BodyFr;
