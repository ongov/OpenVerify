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
import {P, UL, LI, TitleText} from 'containers/results/styles';
import {shouldAllowPaperVaccineProof} from 'utils/rulesHelper';

const TimeoutEn: FC = () => {
  const isPaperProofAllowed = shouldAllowPaperVaccineProof();

  return (
    <>
      <TitleText>The device’s camera could not find a QR code.</TitleText>
      <P>What to do next:</P>
      <UL>
        <LI>wipe the camera lens</LI>
        <LI>turn the flashlight on or off</LI>
        <LI>if the QR code is printed on paper, try to flatten the paper</LI>
        <LI>
          if the QR code is on a device, turn up the brightness of the device’s
          screen
        </LI>
        <LI>make sure light is not reflecting on the QR code</LI>
        <LI>try to scan again</LI>
      </UL>
      {isPaperProofAllowed && (
        <P>
          If the scanner continues to time out, review the visitor’s
          government-issued paper or digital vaccine certificate and a piece of
          identification.
        </P>
      )}
    </>
  );
};
export default TimeoutEn;
