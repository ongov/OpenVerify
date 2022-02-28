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
import {P, UL, LI, B} from 'containers/settings/styles';

const BodyFr: FC = () => (
  <>
    <P>
      Lorsque vous numérisez le code QR numérique ou papier d’un visiteur, cette
      application pourra{' '}:
    </P>
    <UL>
      <LI>
        vérifier qu’un certificat de vaccination <B>valide</B> délivré par
        l'Ontario répond aux exigences de cette province
      </LI>
      <LI>
        afficher le <B>nom</B> et la <B>date de naissance</B> d’un visiteur afin
        que son identité puisse être vérifiée
      </LI>
      <LI>
        recueillir des données pour des mesures qui{' '}
        <B>ne sont pas associées aux utilisateurs</B>
      </LI>
      <LI>
        fonctionner <B>hors ligne</B> (sans connexion internet)
      </LI>
    </UL>
    <P>
      Cette application ne permet <B>pas de</B>
      {' '}:
    </P>
    <UL>
      <LI>
        recueillir des renseignements quelconques reliant des lieux, des
        visiteurs ou des entreprises déterminées les uns aux autres
      </LI>
      <LI>
        faire le suivi ou d’enregistrer des informations permettant d’identifier
        les personnes par le gouvernement ou les entreprises de l’Ontario
      </LI>
      <LI>
        partager plus d’informations que ce qui est nécessaire pour entrer au
        site
      </LI>
    </UL>
  </>
);
export default BodyFr;
