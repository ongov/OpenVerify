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

const BodyFr = React.forwardRef<any, React.PropsWithChildren<Props>>(
  (props, forwardedRef) => {
    const {screenReaderEnabled} = props;
    const focusRef = useForwardedRef(forwardedRef);
    return (
      <>
        <TitleText ref={focusRef}>
          VérifOuverte est une application destinée aux entreprises et aux
          organismes
        </TitleText>
        <SubtitleText>
          VérifOuverte offre un moyen rapide, facile et sécurisé de numériser et
          de confirmer que le certificat de vaccination amélioré muni d’un code
          QR officiel d’un visiteur répond aux exigences de l’Ontario concernant
          les conditions d’entrée.
        </SubtitleText>
        <SubtitleText>
          <B>
            L'application ne permet pas de sauvegarder ou de télécharger votre
            preuve de vaccination.
          </B>
        </SubtitleText>
        <SubtitleText>
          Pour télécharger votre certificat de vaccination amélioré muni d’un
          code QR, veuillez visiter le site{' '}
          <LinkText
            onPress={() => {
              openURL(
                'https://www.ontario.ca/obtenirpreuve',
                true,
                'ontario.ca/obtenirpreuve',
              );
            }}>
            ontario.ca/obtenirpreuve
          </LinkText>
          .
        </SubtitleText>
        {screenReaderEnabled && (
          <Button
            buttonType="secondary"
            onPress={() =>
              openURL(
                'https://www.ontario.ca/obtenirpreuve',
                true,
                'Visitez le site ontario.ca/obtenirpreuve',
              )
            }>
            Visitez le site ontario.ca/obtenirpreuve
          </Button>
        )}
      </>
    );
  },
);

export default BodyFr;
