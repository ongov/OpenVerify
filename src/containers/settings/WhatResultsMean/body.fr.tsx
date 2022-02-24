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
  TimeoutResult,
} from 'components/results/result';
import useTelLink from 'utils/useTelLink';
import openURL from 'utils/openURL';
import {trackLogEvent} from 'utils/analytics';
import {shouldAllowPaperVaccineProof} from 'utils/rulesHelper';
import {verifyEvent} from 'config/analytics';

interface Props {
  screenReaderEnabled: boolean;
}

const BodyFr: FC<Props> = ({screenReaderEnabled}) => {
  const telLink = useTelLink('1-833-943-3900');
  const isPaperProofAllowed = shouldAllowPaperVaccineProof();

  return (
    <>
      <SubContainer>
        <P>Cette application permet de vérifier que{' '}:</P>
        <UL>
          <LI>
            le code QR d’un visiteur répond aux exigences de l’Ontario pour
            l’entrée
          </LI>
        </UL>
        <P>
          Lorsque l’application numérise un code QR, il y a <B>trois</B>{' '}
          résultats possibles ou le numériseur cesse de fonctionner{' '}:
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
          Ce certificat de vaccination <B>répond aux exigences de l’Ontario</B>{' '}
          pour l'entrée.
        </P>
      </ResultDescription>
      <WarningResult />
      <ResultDescription>
        <P>Par exemple, le code QR a pu être{' '}:</P>
        <UL>
          <LI>
            délivré à un enfant de moins de 12 ans ou qui vient d’avoir 12 ans
          </LI>
          <LI>
            délivré par une province, un territoire ou un pays qui utilise un
            autre type de code QR
          </LI>
          <LI>
            délivré par un service tierce non associé au gouvernement de
            l’Ontario
          </LI>
        </UL>
        {isPaperProofAllowed && (
          <P>
            Le personnel peut examiner le certificat de vaccination papier ou
            numérique délivré par le gouvernement ainsi qu’une pièce d'identité
            du visiteur.
          </P>
        )}
        <P>
          Les enfants de moins de 12 ans ou nés en 2010 et qui sont à moins de
          12 semaines (84 jours) de leur anniversaire peuvent entrer, ils n’ont
          pas à fournir de preuve de vaccination.
        </P>
        <P>
          Pour plus d’aide, visitez le site{' '}
          <LinkText
            onPress={() => {
              openURL(
                'https://www.ontario.ca/aide-preuve-vaccination',
                true,
                'ontario.ca/aide-preuve-vaccination',
              );
            }}>
            ontario.ca/aide-preuve-vaccination
          </LinkText>
        </P>
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
      </ResultDescription>
      <ErrorResult />
      <ResultDescription>
        <P>
          Le certificat ou le code{' '}
          <B>ne répond pas aux exigences actuelles de l’Ontario</B> pour
          l’entrée.
        </P>
        <P>Le personnel doit avertir le visiteur{' '}:</P>
        <UL>
          <LI>
            que ce certificat <B>ne peut pas être</B> accepté pour entrer
          </LI>
          <LI>
            qu’il doit{' '}
            <B>
              télécharger son certificat de vaccination amélioré le plus récent
              muni d’un code QR officiel
            </B>{' '}
            s’il est entièrement vacciné et qu’il s’est écoulé 14 jours ou s’ils
            ont une exemption médicale valide
          </LI>
          <LI>
            réacheminer la personne vers{' '}
            <LinkText
              onPress={() => {
                openURL(
                  'https://www.ontario.ca/verif-resultats',
                  true,
                  'ontario.ca/verif-resultats',
                );
              }}>
              ontario.ca/verif-resultats
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
        {screenReaderEnabled && (
          <Button
            buttonType="secondary"
            onPress={() =>
              openURL(
                'https://www.ontario.ca/verif-resultats',
                true,
                'Visitez le site ontario.ca/verif-resultats',
              )
            }>
            Visitez le site ontario.ca/verif-resultats
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
        <P>Le code QR peut indiquer que{' '}:</P>
        <UL>
          <LI>
            le visiteur <B>n’a reçu qu’une seule dose du vaccin</B>
          </LI>
          <LI>
            il pourrait <B>ne pas s’être écoulé 14 jours</B> depuis que le
            visiteur a été entièrement vacciné
          </LI>
          <LI>
            <B>l’exemption médicale</B> du visiteur <B>n’est plus valide</B>
          </LI>
        </UL>
      </ResultDescription>
      <TimeoutResult />
      <ResultDescriptionLast>
        <P>
          <B>La caméra n’a pas pu trouver le code QR.</B>
        </P>
        <P>Ce qu’il faut faire ensuite{' '}:</P>
        <UL>
          <LI>essuyez l’objectif de la caméra</LI>
          <LI>allumez ou éteignez la lampe de poche</LI>
          <LI>
            si le code QR est imprimé sur papier, essayez d’aplatir le papier
          </LI>
          <LI>
            si le code QR est affiché sur un appareil, augmentez la luminosité
            de l'écran de l'appareil
          </LI>
          <LI>assurez-vous que la lumière ne se reflète pas sur le code QR</LI>
          <LI>essayez de le numériser à nouveau</LI>
        </UL>
        {isPaperProofAllowed && (
          <P>
            Si le numériseur s’arrête encore, vérifiez le certificat de
            vaccination papier ou numérique délivré par le gouvernement ainsi
            qu’une pièce d’identité du visiteur.
          </P>
        )}
      </ResultDescriptionLast>
    </>
  );
};
export default BodyFr;
