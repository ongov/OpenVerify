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

const BodyEn = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <>
      <TitleText ref={focusRef}>What this app does</TitleText>
      <SubtitleText>
        When a <B>business or organization</B> scans a visitor’s digital or
        paper QR code, this app:
      </SubtitleText>
      <Bullet>
        improves the <B>safety</B> of indoor spaces
      </Bullet>
      <Bullet>
        protects user privacy by only reading certificates that are{' '}
        <B>trusted</B> and <B>secure</B>
      </Bullet>
      <Bullet>
        checks if a vaccine certificate with QR code is <B>valid</B>
      </Bullet>
      <Bullet>
        shows a visitor’s <B>name</B> and <B>date of birth</B> so their identity
        can be verified
      </Bullet>
      <Bullet>
        works <B>offline</B> (without an internet connection)
      </Bullet>
      <Bullet>
        collects data for metrics that are <B>not connected to users</B>
      </Bullet>
    </>
  );
});
export default BodyEn;
