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
import {VC} from './lib/models/VC';
import {DateTime} from 'luxon';

export type QRCodeResponse =
  | InvalidQRCode
  | InvalidThirdPartyQRCode
  | CompleteSHC
  | PartialSHC;

export interface InvalidQRCode {
  valid: false;
  thirdParty: false;
  multi: MultiQRState | null;
}

export interface InvalidThirdPartyQRCode {
  valid: false;
  thirdParty: true;
  multi: MultiQRState | null;
}

export interface CompleteSHC {
  type: 'SHC';
  valid: true;
  complete: true;
  multi: MultiQRState | null;
  credential: SHCJWTPayload;
  name: string;
  birthDate: string;
  parsedBirthDate: DateTime | undefined;
}

export interface PartialSHC {
  type: 'SHC';
  valid: true;
  complete: false;
  multi: MultiQRState | null;
}

export interface MultiQRState {
  /* which one was just scanned (if applicable) */
  chunk?: number;
  /* how many total to scan */
  totalChunks: number;
  /* indexes that were scanned */
  chunksScanned: number[];
}

export interface SHCJWTPayload {
  iss: string;
  nbf: number;
  vc: VC;
}
