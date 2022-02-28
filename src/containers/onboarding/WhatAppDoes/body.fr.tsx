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
import {TitleText, SubtitleText, B} from 'containers/onboarding/styles';
import {Bullet} from 'components/core/bullet';
import useForwardedRef from 'utils/useForwardedRef';

const BodyFr = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <>
      <TitleText ref={focusRef}>Que fait cette application</TitleText>
      <SubtitleText>
        Lorsqu’une <B>entreprise ou une organisation</B> numérise le code QR
        numérique ou papier d’un visiteur, cette application permettra{' '}:
      </SubtitleText>
      <Bullet>
        d’améliorer la <B>sécurité</B> dans des lieux tels que les restaurants,
        les centres d’entraînement physique et salles de cinéma
      </Bullet>
      <Bullet>
        de protéger les renseignements personnels de l’utilisateur en lisant
        seulement les certificats qui sont <B>fiables</B> et <B>sécurisés</B>
      </Bullet>
      <Bullet>
        de vérifier si un certificat est <B>valide</B> et si le visiteur{' '}
        <B>est autorisé à y entrer</B>
      </Bullet>
      <Bullet>
        d’afficher le <B>nom</B> et la <B>date de naissance</B> d’un visiteur
        afin que son identité puisse être vérifiée
      </Bullet>
      <Bullet>
        de fonctionner <B>hors ligne</B> (sans connexion Internet)
      </Bullet>
      <Bullet>
        de recueillir des données pour des mesures qui{' '}
        <B>ne sont pas associées aux utilisateurs</B>
      </Bullet>
    </>
  );
});
export default BodyFr;
