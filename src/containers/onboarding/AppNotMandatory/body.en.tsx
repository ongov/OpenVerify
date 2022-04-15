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

const BodyEn = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);

  return (
    <>
      <TitleText ref={focusRef}>
        Proof of vaccination is no longer required for entry
      </TitleText>
      <B>Effective March 1, 2022</B>
      <SubtitleText>Businesses and organizations:</SubtitleText>
      <Bullet>
        are not required to check proof of vaccination or use this app
      </Bullet>
      <Bullet>
        may choose to check for proof of vaccination and use the app
      </Bullet>
    </>
  );
});

export default BodyEn;
