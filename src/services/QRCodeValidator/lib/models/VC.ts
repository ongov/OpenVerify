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
export interface VC {
  type?: string[];
  credentialSubject?: CredentialSubject;
}

export interface CredentialSubject {
  fhirVersion?: string;
  fhirBundle?: FhirBundle;
}

export interface FhirBundle {
  resourceType?: string;
  type?: string;
  entry?: Entry[];
}

export interface Entry {
  fullUrl?: string;
  resource?: Resource;
  daysAgo: number;
}

export interface Resource {
  resourceType?: string;
  name?: Name[];
  birthDate?: string;
  status?: string;
  vaccineCode?: VaccineCode;
  patient?: Patient;
  occurrenceDateTime?: string;
  performer?: Performer[];
  lotNumber?: string;
  recordedDate?: string;
  abatementDateTime?: string;
  subject?: Subject;
}

export interface Name {
  family?: string;
  given?: string[];
  text?: string;
}

export interface Patient {
  reference?: string;
}

export interface Subject {
  reference?: string;
}

export interface Performer {
  actor?: Actor;
}

export interface Actor {
  display?: string;
}

export interface VaccineCode {
  coding?: Coding[];
}

export interface Coding {
  system?: string;
  code?: string;
}
