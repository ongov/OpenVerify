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
  CloseImage,
  ErrorImage,
  WarningImage,
  TitleText,
  P,
  B,
} from 'containers/home/styles';
import useForwardedRef from 'utils/useForwardedRef';

interface Props {
  expired: boolean;
  redWarning: boolean;
  yellowWarning: boolean;
  daysLeft: number;
}

const NUMBERS_TO_WORDS: any = {
  2: 'deux',
  3: 'trois',
  4: 'quatre',
  5: 'cinq',
  6: 'six',
  7: 'sept',
};

const BodyFr = React.forwardRef<any, Props>(
  ({expired, redWarning, yellowWarning, daysLeft}, forwardedRef) => {
    const focusRef = useForwardedRef(forwardedRef);
    return (
      <>
        {expired ? (
          <CloseImage />
        ) : redWarning ? (
          <ErrorImage />
        ) : (
          <WarningImage />
        )}

        <TitleText ref={focusRef}>Connexion à l’Internet</TitleText>
        {(redWarning || yellowWarning) && (
          <P>
            Votre appareil doit être <B>connecté à l’Internet</B> pour mettre à
            jour les exigences concernant les conditions d’entrée.
          </P>
        )}

        {expired ? (
          <P>
            Cette application ne numérisera pas les certificats de vaccination
            tant qu’elle ne se sera pas connectée pour télécharger des mises à
            jour.
          </P>
        ) : (
          <>
            <P>
              Si l’application n’est pas mise à jour{' '}
              {daysLeft === 1 ? (
                <B>le lendemain</B>
              ) : (
                <B>{NUMBERS_TO_WORDS[daysLeft]} prochains jours</B>
              )}
              , elle <B>cessera de fonctionner</B>.
            </P>
            <P>
              Vous pouvez vérifier les mises à jour à tout moment dans la page
              des paramètres et informations supplémentaires.
            </P>
          </>
        )}
      </>
    );
  },
);
export default BodyFr;
