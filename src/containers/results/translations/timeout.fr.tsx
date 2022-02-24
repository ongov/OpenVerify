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
import {P, UL, LI, TitleText} from 'containers/results/styles';
import {shouldAllowPaperVaccineProof} from 'utils/rulesHelper';

const TimeoutFr: FC = () => {
  const isPaperProofAllowed = shouldAllowPaperVaccineProof();

  return (
    <>
      <TitleText>La caméra n’a pas pu trouver le code QR.</TitleText>
      <P>Ce qu’il faut faire ensuite{' '}:</P>
      <UL>
        <LI>essuyez l’objectif de la caméra</LI>
        <LI>allumez ou éteignez la lampe de poche</LI>
        <LI>
          si le code QR est imprimé sur papier, essayez d’aplatir le papier
        </LI>
        <LI>
          si le code QR est affiché sur un appareil, augmentez la luminosité de
          l'écran de l'appareil
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
    </>
  );
};
export default TimeoutFr;
