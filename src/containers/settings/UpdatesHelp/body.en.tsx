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
    <P>
      The app needs to connect to the internet every week to check for updates
      about Ontario’s definition of fully vaccinated.
    </P>
    <P>When connected, it will:</P>
    <UL>
      <LI>notify you if there is an updated version of the app available</LI>
      <LI>update technical requirements</LI>
    </UL>
    <P>
      You will get requests to connect to the internet daily if the app has not
      been updated after 4 days.
    </P>
    <P>
      If the app does not update for 7 days, it will <B>stop working</B> until
      you connect to update.
    </P>
    <P>
      When you update regularly, you get the most accurate technical
      requirements.
    </P>
    <P>
      Updates happen automatically when the device is connected to the internet.
      You can update manually on the settings and information page.
    </P>
  </>
);
export default BodyEn;
