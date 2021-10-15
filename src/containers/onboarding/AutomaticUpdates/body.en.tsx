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

const BodyEn = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <>
      <TitleText ref={focusRef}>Automatic updates</TitleText>
      <SubtitleText>
        To keep your venue and visitors safe, the app will need to connect to
        the internet weekly.
      </SubtitleText>
      <SubtitleText>When connected, it will:</SubtitleText>
      <Bullet>
        let you know if there is an updated version of the app available
      </Bullet>
      <Bullet>update vaccine or entry requirements</Bullet>
    </>
  );
});
export default BodyEn;
