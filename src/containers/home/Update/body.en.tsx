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
  ErrorImage,
  WarningImage,
  TitleText,
  P,
  B,
} from 'containers/home/styles';
import useForwardedRef from 'utils/useForwardedRef';

interface Props {
  expired: boolean;
  redWarning: boolean;
  yellowWarning: boolean;
  daysLeft: number;
}

const BodyEn = React.forwardRef<any, Props>(
  ({expired, redWarning, yellowWarning, daysLeft}, forwardedRef) => {
    const focusRef = useForwardedRef(forwardedRef);
    return (
      <>
        {expired ? (
          <CloseImage />
        ) : redWarning ? (
          <ErrorImage />
        ) : (
          <WarningImage />
        )}

        <TitleText ref={focusRef}>Connect to internet</TitleText>
        {(redWarning || yellowWarning) && (
          <P>
            Your device needs to <B>connect to the internet</B> to update entry
            requirements.
          </P>
        )}

        {expired ? (
          <P>
            This app <B>will not scan</B> vaccine certificates until it has
            connected for updates.
          </P>
        ) : (
          <>
            <P>
              If the app is not updated in the next{' '}
              {daysLeft === 1 ? <B>day</B> : <B>{daysLeft} days</B>}, it will{' '}
              <B>stop scanning</B>.
            </P>
            <P>
              You can check for updates any time on the settings and information
              page.
            </P>
          </>
        )}
      </>
    );
  },
);
export default BodyEn;
