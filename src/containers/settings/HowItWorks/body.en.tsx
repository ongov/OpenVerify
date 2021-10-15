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
import React, {FC} from 'react';
import {P, UL, LI, B} from 'containers/settings/styles';

const BodyEn: FC = () => (
  <>
    <P>When you scan a visitor’s digital or paper QR code, this app will:</P>
    <UL>
      <LI>
        verify that a <B>valid</B> vaccine certificate meets Ontario
        requirements
      </LI>
      <LI>
        show a visitor’s <B>name</B> and <B>date of birth</B> so their identity
        can be verified
      </LI>
      <LI>
        collect data for metrics that are <B>not connected to users</B>
      </LI>
      <LI>
        work <B>offline</B> (without an internet connection)
      </LI>
    </UL>
    <P>
      This app does <B>not</B>:
    </P>
    <UL>
      <LI>
        collect any information that links specific locations, visitors or
        businesses to each other
      </LI>
      <LI>
        allow the Ontario government or businesses to track or save personally
        identifiable information
      </LI>
      <LI>share more information than what is needed for entry</LI>
    </UL>
  </>
);
export default BodyEn;
