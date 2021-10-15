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
import {applyRules} from 'utils/validate';

const rules = require('../../__mocks__/ruleset.json');

describe('RuleInterpretor', () => {
  // Verified
  test('One dose, valid - oneDoseValid', () => {
    const qrCode = require('../../__mocks__/qr-codes/oneDoseValid.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  test('Two dose, valid - twoDoseValidMix', () => {
    let qrCode = require('../../__mocks__/qr-codes/twoDoseValidMix.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });
  test('Two dose, valid - twoDoseValidModerna', () => {
    const qrCode = require('../../__mocks__/qr-codes/twoDoseValidModerna.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });
  test('Two dose, valid - twoDoseValidPfizer', () => {
    const qrCode = require('../../__mocks__/qr-codes/twoDoseValidPfizer.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  test('Two dose, valid - twoDoseValidAstrazeneca', () => {
    const qrCode = require('../../__mocks__/qr-codes/twoDoseValidAstrazeneca.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  test('Two dose, valid - twoDoseValidOneNonHCOnePfizer', () => {
    const qrCode = require('../../__mocks__/qr-codes/twoDoseValidOneNonHCOnePfizer.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  test('Three dose, valid - threeDoseAllValid', () => {
    const qrCode = require('../../__mocks__/qr-codes/threeDoseAllValid.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  test('Two dose, valid - threeDoseAllNonHC', () => {
    const qrCode = require('../../__mocks__/qr-codes/threeDoseAllNonHC.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  test('Two dose, valid - threeDoseTwoValidOneNonHC', () => {
    const qrCode = require('../../__mocks__/qr-codes/threeDoseTwoValidOneNonHC.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  test('Two dose, valid - threeDoseOneValidTwoNonHC', () => {
    const qrCode = require('../../__mocks__/qr-codes/threeDoseOneValidTwoNonHC.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  // Not Verified
  test('One dose, invalid - oneDoseInvalid', () => {
    const qrCode = require('../../__mocks__/qr-codes/oneDoseInvalid.json');
    expect(applyRules(rules, qrCode)).toBeFalsy();
  });

  test('Two dose, invalid - twoDoseInvalidTwo', () => {
    const qrCode = require('../../__mocks__/qr-codes/twoDoseInvalidTwo.json');
    expect(applyRules(rules, qrCode)).toBeFalsy();
  });

  test('Two dose, invalid - twoDoseInvalidOne', () => {
    const qrCode = require('../../__mocks__/qr-codes/twoDoseInvalidOne.json');
    expect(applyRules(rules, qrCode)).toBeFalsy();
  });

  test('Two dose, invalid - twoDoseValidOnePfizerOneNonHC', () => {
    const qrCode = require('../../__mocks__/qr-codes/twoDoseValidOnePfizerOneNonHC.json');
    expect(applyRules(rules, qrCode)).toBeFalsy();
  });

  test('Three dose, invalid - threeDoseAllInvalid', () => {
    const qrCode = require('../../__mocks__/qr-codes/threeDoseAllInvalid.json');
    expect(applyRules(rules, qrCode)).toBeFalsy();
  });

  test('Two dose, valid - threeDoseInvalidTwoOnePfizer', () => {
    const qrCode = require('../../__mocks__/qr-codes/threeDoseInvalidTwoOnePfizer.json');
    expect(applyRules(rules, qrCode)).toBeFalsy();
  });

  test('Two dose, valid - threeDoseInvalidOneTwoNonHC', () => {
    const qrCode = require('../../__mocks__/qr-codes/threeDoseInvalidOneTwoNonHC.json');
    expect(applyRules(rules, qrCode)).toBeFalsy();
  });

  test('One dose, valid - missingCVX', () => {
    const qrCode = require('../../__mocks__/qr-codes/missingCVX.json');
    expect(applyRules(rules, qrCode)).toBeFalsy();
  });

  test('One dose, valid - misplacedCVX', () => {
    const qrCode = require('../../__mocks__/qr-codes/misplacedCVX.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  // Snomed SCT test
  // Missing CVX Only valid SCT 1 dose
  test('One dose, valid - oneDoseValidSCTMissingCVX', () => {
    const qrCode = require('../../__mocks__/qr-codes/oneDoseValidSCTMissingCVX.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });
  // Wrong CVX Only valid SCT 1 dose
  test('One dose, valid - oneDoseValidSCTWrongCVX', () => {
    const qrCode = require('../../__mocks__/qr-codes/oneDoseValidSCTWrongCVX.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  // Missing CVX Only valid SCT 2 dose
  test('Two dose, valid - twoDoseValidMixMissingCVX', () => {
    const qrCode = require('../../__mocks__/qr-codes/twoDoseValidMixMissingCVX.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });
  // Wrong CVX Only valid SCT 2 dose
  test('Two dose, valid - twoDoseValidMixWrongCVX', () => {
    const qrCode = require('../../__mocks__/qr-codes/twoDoseValidMixWrongCVX.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });

  // 3 NON HC ONLY SCT
  test('Three dose, valid - threeDoseAllNonHCMissingCVX', () => {
    const qrCode = require('../../__mocks__/qr-codes/threeDoseAllNonHCMissingCVX.json');
    expect(applyRules(rules, qrCode)).toBeTruthy();
  });
});
