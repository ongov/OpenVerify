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

const WarningThirdPartyFr: FC<Props> = ({screenReaderEnabled}) => {
  return (
    <>
      <TitleText>
        Ce certificat a été créé à l’aide d’un outil tiers et ne peut pas être
        utilisé pour la numérisation.
      </TitleText>
      <P>Ce qu’il faut faire ensuite{' '}:</P>
      <UL>
        <LI>
          demander au visiteur de produire un certificat délivré par le
          gouvernement
        </LI>
        <LI>
          informez le visiteur que les certificats de vaccination optimisés avec
          un code QR délivrés par le gouvernement peuvent être téléchargés à
          l’adresse suivant{' '}:{' '}
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
        </LI>
      </UL>
      {screenReaderEnabled && (
        <Button
          buttonType="secondary"
          onPress={() => {
            openURL(
              'https://www.ontario.ca/obtenirpreuve',
              true,
              'Visitez le site ontario.ca/obtenirpreuve',
            );
          }}>
          Visitez le site ontario.ca/obtenirpreuve
        </Button>
      )}
    </>
  );
};
export default WarningThirdPartyFr;
