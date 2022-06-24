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
import useForwardedRef from 'utils/useForwardedRef';

const BodyEn = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);

  return (
    <>
      <TitleText ref={focusRef}>
        Proof of vaccination is not mandatory
      </TitleText>
      <SubtitleText>
        The Open Verify app will no longer be available as of June 24, 2022. The
        app will not scan QR codes and will not receive updates or support after
        this date.
      </SubtitleText>
    </>
  );
});

export default BodyEn;
