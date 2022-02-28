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
import {TitleText, SubtitleText} from 'containers/onboarding/styles';
import {Bullet} from 'components/core/bullet';
import useForwardedRef from 'utils/useForwardedRef';

const BodyFr = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <>
      <TitleText ref={focusRef}>Mises à jour automatiques</TitleText>
      <SubtitleText>
        Afin d’assurer la sécurité de votre établissement et des visiteurs,
        cette application devra se connecter à l’Internet chaque semaine.
      </SubtitleText>
      <SubtitleText>Une fois connectée, elle{' '}:</SubtitleText>
      <Bullet>
        vous indique si une version à jour de l’application est disponible
      </Bullet>
      <Bullet>
        met à jour les exigences concernant les vaccins ou les conditions
        d’entrée
      </Bullet>
    </>
  );
});
export default BodyFr;
