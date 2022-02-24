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
      L’application doit se connecter à l’Internet chaque semaine afin de
      vérifier si les conditions d’entrée dans les établissements en Ontario ont
      été mises à jour.
    </P>
    <P>Une fois connectée, elle{' '}:</P>
    <UL>
      <LI>
        met à jour les exigences concernant les vaccins ou les conditions
        d’entrée
      </LI>
      <LI>
        vous indique si une version mise à jour de l’application est disponible
      </LI>
    </UL>
    <P>
      Vous recevrez des demandes de connexion à Internet si l’application n’a
      pas été mise à jour depuis quatre jours.
    </P>
    <P>
      Si l’application n’est pas mise à jour pendant sept jours, elle{' '}
      <B>cessera de fonctionner</B> jusqu’à ce que vous vous connectiez pour la
      mettre à jour.
    </P>
    <P>
      Lorsque vous effectuez des mises à jour régulièrement, vous obtenez les
      informations les plus précises pour assurer la sécurité de votre
      établissement et des visiteurs.
    </P>
    <P>
      Les mises à jour se font automatiquement lorsque l’appareil est connecté à
      l’Internet. Vous pouvez effectuer une mise à jour manuelle en allant sur
      la page des paramètres et informations supplémentaires.
    </P>
  </>
);
export default BodyFr;
