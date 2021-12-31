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
import {Settings} from 'luxon';
import {applyRules} from 'utils/validate';
import {readFile} from 'fs/promises';
import {join} from 'path';
import rulesJson from '../../__mocks__/ruleset.json';

const rules = rulesJson as any;

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

  test('One dose, valid normally but actually invalid - less than 14 days', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2021, 2, 16).valueOf(); // March 16, 2021 - on the 14th day from March 2, 2021 when this example dose was administered
    try {
      const qrCode = require('../../__mocks__/qr-codes/oneDoseValid.json');
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('One dose, valid normally but actually invalid - it was given in the future', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2021, 1, 2).valueOf(); // invalid, in the future - "today" is February 2, 2021 but the vaccine was administered on March 2, 2021
    try {
      const qrCode = require('../../__mocks__/qr-codes/oneDoseValid.json');
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('One dose, valid normally - after 14 days', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2021, 2, 17).valueOf(); // March 17, 2021 - on the 15th day from March 2, 2021 when this example dose was administered
    try {
      const qrCode = require('../../__mocks__/qr-codes/oneDoseValid.json');
      expect(applyRules(rules, qrCode)).toBe(true);
    } finally {
      Settings.now = oldNow;
    }
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

  test('Vaccine exemption with expiry, valid - within exemption expiry', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 2, 7).valueOf(); // March 7, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      condition.recordedDate = '2021-12-07';
      condition.abatementDateTime = '2022-06-07';
      expect(applyRules(rules, qrCode)).toBe(true);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption with expiry, invalid - invalid resourceType', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 2, 7).valueOf(); // March 7, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      condition.recordedDate = '2021-12-07';
      condition.abatementDateTime = '2022-06-07';
      condition.resourceType = 'NotACondition';
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption with expiry, invalid - invalid condition category coding system', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 2, 7).valueOf(); // March 7, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      condition.recordedDate = '2021-12-07';
      condition.abatementDateTime = '2022-06-07';
      condition.category[0].coding[0].system = 'https://example.com';
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption with expiry, invalid - invalid condition category code', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 2, 7).valueOf(); // March 7, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      condition.recordedDate = '2021-12-07';
      condition.abatementDateTime = '2022-06-07';
      condition.category[0].coding[0].code = 'not-a-vaccine-exemption';
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption with expiry, invalid - on abatement date', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 5, 7).valueOf(); // June 7, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      condition.recordedDate = '2021-12-07';
      condition.abatementDateTime = '2022-06-07';
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption with expiry, invalid - after exemption expiry', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 5, 8).valueOf(); // June 8, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      condition.recordedDate = '2021-12-07';
      condition.abatementDateTime = '2022-06-07';
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption with short expiry, invalid - within 6 months but after exemption expiry', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 3, 8).valueOf(); // March 8, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      condition.recordedDate = '2021-12-07';
      condition.abatementDateTime = '2022-03-07';
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption without expiry, valid - within six months', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 3, 8).valueOf(); // March 8, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      condition.recordedDate = '2021-12-07';
      delete condition.abatementDateTime;
      expect(applyRules(rules, qrCode)).toBe(true);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption without expiry, invalid - exactly six months later', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 5, 7).valueOf(); // June 7, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      condition.recordedDate = '2021-12-07';
      delete condition.abatementDateTime;
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption without expiry or recorded date, invalid', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 3, 8).valueOf(); // March 8, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const condition =
        qrCode.vc.credentialSubject.fhirBundle.entry[2].resource;
      delete condition.recordedDate;
      delete condition.abatementDateTime;
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Vaccine exemption with empty Condition resource, invalid', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 3, 8).valueOf(); // March 8, 2022.
    try {
      const qrCode = JSON.parse(
        await readFile(
          join(__dirname, '../../__mocks__/qr-codes/vaccineExemption.json'),
          {encoding: 'utf-8'},
        ),
      );
      const entry = qrCode.vc.credentialSubject.fhirBundle.entry[2];
      entry.resource = {resourceType: 'Condition'};
      expect(applyRules(rules, qrCode)).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });
});
