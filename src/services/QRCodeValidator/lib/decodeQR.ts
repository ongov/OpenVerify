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
import pako from 'pako';
import {SHCJWTPayload} from '../types';
import {ec as EC} from 'elliptic';
import sha256 from 'crypto-js/sha256';
import {Base64URLtoString, Base64URLtoBuffer, toHex} from './utils/utils';
import {TrustedIssuersJWKS} from './models/TrustedIssuersJWKS';
import {Key} from './models/Jwks';
import {VC, FhirBundle} from './models/VC';

const ec = new EC('p256');
const evenLengthDigitsRegex = /\d{2}/g;

interface decodeQRResult {
  credential: SHCJWTPayload;
  name: string;
  birthDate: string;
}

export default function decodeQR(
  trustedIssuersJWKS: TrustedIssuersJWKS,
  numbers: string,
): decodeQRResult {
  const arrayOfBase64Numbers = numbers.match(evenLengthDigitsRegex);
  if (!arrayOfBase64Numbers) {
    throw 'validateSHC given an odd length of digits';
  }
  const charCodes = arrayOfBase64Numbers.map(n => parseInt(n, 10) + 45);
  return validateJWT(String.fromCharCode(...charCodes), trustedIssuersJWKS);
}

export function validateJWT(
  jwt: string,
  trustedIssuers: TrustedIssuersJWKS,
): decodeQRResult {
  const [h, p, s] = jwt.split('.', 3);
  if (h === undefined || p === undefined || s === undefined) {
    throw 'invalid JWT';
  }
  const header = validateJWTHeader(h);
  const issuers = validateJWTSignature(s, trustedIssuers, header, h, p);
  const credential = unzipDecodeJWTPayload(p);
  return {credential, ...validateJWSPayload(credential, issuers)};
}

type Issuer = string;
interface KeyAndIssuer {
  key: Key;
  iss: Issuer;
}

function validateJWTSignature(
  s: string,
  trustedIssuers: TrustedIssuersJWKS,
  header: any,
  h: string,
  p: string,
): Issuer[] {
  const signature = Base64URLtoBuffer(s);
  if (signature.length !== 64) {
    throw 'invalid JWT signature';
  }
  const possibleKeys = Object.entries(trustedIssuers).map(([iss, {keys}]) => {
    return {
      // https://spec.smarthealth.cards/#determining-keys-associated-with-an-issuer
      key: keys.find(
        k =>
          k.kid === header.kid &&
          k.kty === 'EC' &&
          k.use === 'sig' &&
          k.alg === 'ES256' &&
          k.crv === 'P-256' &&
          typeof k.x === 'string' &&
          typeof k.y === 'string' &&
          k.d === undefined,
      ),
      iss,
    };
  });
  const keyAndIssuer = possibleKeys.find(({key}) => {
    if (typeof key !== 'object' || key.x === undefined || key.y === undefined) {
      return false; // key not found in jwks
    }
    const ecKey = ec.keyFromPublic({
      x: toHex(Base64URLtoBuffer(key.x)),
      y: toHex(Base64URLtoBuffer(key.y)),
    });
    const ecSignature = {
      r: signature.slice(0, 32),
      s: signature.slice(32, 64),
    };
    const hash = sha256(`${h}.${p}`).toString();
    return ecKey.verify(hash, ecSignature);
  });
  const foundKey = keyAndIssuer?.key;
  if (foundKey === undefined) {
    throw 'key not found';
  }
  // look for other issuers with the same key
  return possibleKeys
    .filter(
      k =>
        k.key &&
        k.key.kid === foundKey.kid &&
        k.key.x === foundKey.x &&
        k.key.y === foundKey.y,
    )
    .map(k => k.iss);
}

function unzipDecodeJWTPayload(p: string): SHCJWTPayload {
  return JSON.parse(
    pako.inflateRaw(Base64URLtoBuffer(p), {
      to: 'string',
    }),
  );
}

function validateJWTHeader(h: string) {
  const headerString = Base64URLtoString(h);
  if (headerString === null) {
    throw 'invalid JWT';
  }
  const header = JSON.parse(headerString);
  if (typeof header !== 'object') {
    throw 'invalid JWT header';
  }
  if (
    header.alg !== 'ES256' ||
    header.zip !== 'DEF' ||
    header.kid === undefined
  ) {
    throw 'invalid JWT header alg (not ES256), zip (not DEF) or missing kid';
  }
  return header;
}

interface FieldsToDisplay {
  name: string;
  birthDate: string;
}

export function validateJWSPayload(
  credential: SHCJWTPayload,
  issuers: Issuer[],
): FieldsToDisplay {
  if (typeof credential !== 'object') {
    throw 'invalid JWT payload';
  }
  if (typeof credential.iss !== 'string') {
    throw 'invalid JWT iss';
  }
  if (!issuers.includes(credential.iss)) {
    throw 'iss mismatch';
  }
  if (typeof credential.nbf !== 'number' || isNaN(credential.nbf)) {
    if (
      credential.iss !== 'https://covid19.quebec.ca/PreuveVaccinaleApi/issuer'
    ) {
      throw 'invalid JWT nbf';
    }
  }
  if (typeof credential.vc !== 'object') {
    throw 'invalid JWT vc (not object)';
  }
  return validateVC(credential.vc, credential.iss);
}

export function validateVC(vc: VC, issuer: string): FieldsToDisplay {
  if (
    !Array.isArray(vc.type) ||
    !vc.type.includes('https://smarthealth.cards#health-card') ||
    !vc.type.includes('https://smarthealth.cards#immunization')
  ) {
    throw 'invalid vc type (health-card & immunization required)';
  }
  const bundle = vc.credentialSubject?.fhirBundle;
  if (bundle === undefined) {
    throw 'missing credentialSubject or bundle';
  }
  return validateFHIRBundle(bundle, issuer);
}

export function validateFHIRBundle(
  bundle: FhirBundle,
  issuer: string,
): FieldsToDisplay {
  if (!Array.isArray(bundle.entry)) {
    throw 'expected bundle entry to be an array';
  }
  const patients = bundle.entry.filter(
    r => r.resource?.resourceType === 'Patient',
  );
  if (patients.length !== 1) {
    throw 'expected exactly one patient resource';
  }
  const patient = patients[0];
  if (typeof patient.resource?.birthDate !== 'string') {
    throw 'expected birthDate to be a string';
  }
  if (
    !Array.isArray(patient.resource.name) ||
    !patient.resource.name.every(
      n =>
        typeof n.family === 'string' ||
        (Array.isArray(n.given) && n.given.every(g => typeof g === 'string')) ||
        typeof n.text === 'string',
    )
  ) {
    throw 'expected name to be correctly specified';
  }
  const immunizations = bundle.entry.filter(
    r => r.resource?.resourceType === 'Immunization',
  );
  if (
    !immunizations.every(
      i =>
        i.resource?.patient?.reference !== undefined &&
        i.resource?.patient?.reference === patient.fullUrl,
    )
  ) {
    if (issuer !== 'https://covid19.quebec.ca/PreuveVaccinaleApi/issuer') {
      throw 'expected all immunizations to be for the patient provided';
    }
  }
  if (
    !immunizations.every(
      i =>
        Array.isArray(i.resource?.vaccineCode?.coding) &&
        (i.resource?.vaccineCode?.coding.length ?? 0) > 0,
    )
  ) {
    throw 'expected all immunizations to have vaccineCode codings';
  }
  return {
    name: patient.resource.name
      .map(n =>
        n.text ? n.text : [...(n.given ?? []), n.family].join(' ').trim(),
      )
      .join(', '),
    birthDate: patient.resource.birthDate,
  };
}
