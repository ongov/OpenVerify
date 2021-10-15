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

const BodyEn = React.forwardRef<any>((_, forwardedRef) => {
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <>
      <CloseImage />

      <TitleText ref={focusRef}>Connect to app store for update</TitleText>
      <SubtitleText>
        There is a new version of Open Verify available in the app store.
      </SubtitleText>
      <SubtitleText>
        Your device needs to{' '}
        <SubtitleTextBold>connect to the app store</SubtitleTextBold> to update
        the application.
      </SubtitleText>
      <SubtitleText>
        This app will <SubtitleTextBold>no longer scan</SubtitleTextBold>{' '}
        vaccine certificates until it has been updated.
      </SubtitleText>
    </>
  );
});
export default BodyEn;
