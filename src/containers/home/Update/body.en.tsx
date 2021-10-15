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
  SubtitleText,
  SubtitleTextBold,
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
          <SubtitleText>
            Your device needs to{' '}
            <SubtitleTextBold>connect to the internet</SubtitleTextBold> to
            update entry requirements.
          </SubtitleText>
        )}

        {expired ? (
          <SubtitleText>
            This app <SubtitleTextBold>will not scan</SubtitleTextBold> vaccine
            certificates until it has connected for updates.
          </SubtitleText>
        ) : (
          <>
            <SubtitleText>
              If the app is not updated in the next{' '}
              {daysLeft === 1 ? (
                <SubtitleTextBold>24 hours</SubtitleTextBold>
              ) : (
                <SubtitleTextBold>{daysLeft} days</SubtitleTextBold>
              )}
              , it will <SubtitleTextBold>stop scanning</SubtitleTextBold>.
            </SubtitleText>
            <SubtitleText>
              You can check for updates any time on the settings and information
              page.
            </SubtitleText>
          </>
        )}
      </>
    );
  },
);
export default BodyEn;
