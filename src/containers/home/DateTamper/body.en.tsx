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
import {CloseImage, TitleText, P} from 'containers/home/styles';
import useForwardedRef from 'utils/useForwardedRef';

const BodyEn = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <>
      <CloseImage />

      <TitleText ref={focusRef}>Update device date/time settings</TitleText>
      <P>
        This app uses the device’s date and time settings to work offline and
        keep entry requirements up-to-date.
      </P>
      <P>
        Changing the date and time settings on this device may stop the app from
        working.
      </P>
    </>
  );
});
export default BodyEn;
