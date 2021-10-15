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

const BodyEn = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <>
      <TitleText ref={focusRef}>This app does not:</TitleText>
      <Bullet>
        allow the Ontario government or businesses to track or save personally
        identifiable information
      </Bullet>
      <Bullet>
        store any information that links specific locations, visitors or
        businesses to each other
      </Bullet>
      <Bullet>share more information than what is needed for entry</Bullet>
    </>
  );
});
export default BodyEn;
