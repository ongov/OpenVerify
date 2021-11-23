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
import {Ruleset} from 'utils/types';
import trustedKeys from './trustedKeys';
import {eddsa as EdDSA} from 'elliptic';
import {
  Base64URLtoString,
  Base64URLtoBuffer,
  toHex,
  strToArrayOfBytes,
} from 'utils/base64-utils';

function RulesetSignatureValidator(jws: string): Ruleset {
  const [h, p, signature] = jws.split('.', 3);
  const ec = new EdDSA('ed25519');
  const validKey = trustedKeys.find(publicKey => {
    const ecKey = ec.keyFromPublic([...Base64URLtoBuffer(publicKey.x)] as any);
    const sig = Base64URLtoBuffer(signature);
    const ecSignature = ec.makeSignature(toHex(sig));
    return ecKey.verify(strToArrayOfBytes(`${h}.${p}`), ecSignature);
  });
  if (validKey === undefined) {
    throw 'Signature invalid';
  }
  const [header, payload] = [h, p].map(x => Base64URLtoString(x));
  if (header === null || JSON.parse(header).alg !== 'EdDSA') {
    throw 'Invalid header alg';
  }
  if (payload === null) {
    throw 'Invalid payload base64url encoding';
  }
  return JSON.parse(payload);
}

export default RulesetSignatureValidator;
