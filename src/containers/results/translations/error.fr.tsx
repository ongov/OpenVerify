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
import {TitleText, P, B, UL, LI, LinkText} from 'containers/results/styles';
import openURL from 'utils/openURL';
import useTelLink from 'utils/useTelLink';
import {trackLogEvent} from 'utils/analytics';
import {verifyEvent} from 'config/analytics';

interface Props {
  screenReaderEnabled: boolean;
}

const ErrorFr: FC<Props> = ({screenReaderEnabled}) => {
  const telLink = useTelLink('1-833-943-3900');
  return (
    <>
      <TitleText>
        Ce certificat ne peut pas être utilisé pour entrer au site.
      </TitleText>
      <P>Ce qu’il faut faire ensuite{' '}:</P>
      <UL>
        <LI>
          informez le visiteur que ce certificat <B>ne peut pas</B> être accepté
          pour entrer
        </LI>
        <LI>
          informez le visiteur qu’il doit{' '}
          <B>
            télécharger son certificat de vaccination amélioré le plus récent
            avec le code QR officiel
          </B>{' '}
          s’il a été entièrement vacciné et qu’il s’est écoulé 14 jours ou s’ils
          ont une exemption médicale valide
        </LI>
        <LI>
          réacheminez le visiteur vers{' '}
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
          pour obtenir des détails sur les résultats et lui dire qu’il peut
          appeler pour obtenir de l’aide supplémentaire au{' '}
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
          le visiteur n’a reçu <B>qu’une seule dose du vaccin</B>
        </LI>
        <LI>
          il pourrait <B>ne pas s’être écoulé 14 jours</B> depuis que le
          visiteur a été entièrement vacciné
        </LI>
        <LI>
          <B>l’exemption médicale</B> du visiteur <B>n’est plus valide</B>
        </LI>
      </UL>
    </>
  );
};
export default ErrorFr;
