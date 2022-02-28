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
import {TitleText} from 'containers/onboarding/styles';
import {Bullet} from 'components/core/bullet';
import useForwardedRef from 'utils/useForwardedRef';

const BodyFr = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <>
      <TitleText
        ref={focusRef}
        accessible
        accessibilityLabel="Cette application ne pas:">
        Cette application ne{' '}:
      </TitleText>
      <Bullet>
        permet pas au gouvernement de l’Ontario ou aux entreprises de suivre ou
        d’enregistrer des informations permettant d’identifier les personnes
      </Bullet>
      <Bullet>
        sauvegarde pas de renseignements quelconques reliant des lieux, des
        visiteurs ou des entreprises déterminés les uns aux autres
      </Bullet>
      <Bullet>
        partage plus d’informations que ce qui est nécessaire pour entrer au
        site
      </Bullet>
    </>
  );
});
export default BodyFr;
