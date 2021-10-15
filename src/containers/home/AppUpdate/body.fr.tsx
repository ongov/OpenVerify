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
  TitleText,
  SubtitleText,
  SubtitleTextBold,
} from 'containers/home/styles';
import useForwardedRef from 'utils/useForwardedRef';

const BodyFr = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <>
      <CloseImage />

      <TitleText ref={focusRef}>
        Connectez-vous à la boutique pour une mise à jour
      </TitleText>
      <SubtitleText>
        Une nouvelle version de VérifOuverte est disponible dans la boutique
        d’applications.
      </SubtitleText>
      <SubtitleText>
        Votre appareil doit se connecter à la boutique d’applications pour en
        faire la mise à jour.
      </SubtitleText>
      <SubtitleText>
        Cette application <SubtitleTextBold>n’analysera plus</SubtitleTextBold>{' '}
        les certificats de vaccination jusqu’à qu’elle ait été mise à jour.
      </SubtitleText>
    </>
  );
});
export default BodyFr;
