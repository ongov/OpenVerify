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
import {SubtitleText, TitleText} from 'containers/onboarding/styles';
import {Bullet} from 'components/core/bullet';
import useForwardedRef from 'utils/useForwardedRef';
import {B} from './styles';

const BodyFr = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);

  return (
    <>
      <TitleText ref={focusRef}>
        La preuve de vaccination n’est plus requise pour l’entrée
      </TitleText>
      <B>En vigueur à compter du 1er mars 2022</B>
      <SubtitleText>Les entreprises et les organismes :</SubtitleText>
      <Bullet>
        ne sont plus tenus de vérifier la preuve de vaccination ou d’utiliser
        cette application;
      </Bullet>
      <Bullet>
        ont le choix de vérifier la preuve de vaccination et d’utiliser
        l’application.
      </Bullet>
    </>
  );
});

export default BodyFr;
