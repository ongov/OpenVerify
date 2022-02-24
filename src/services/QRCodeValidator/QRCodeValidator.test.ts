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
import QRCodeValidator from './QRCodeValidator';
import {
  CompleteSHC,
  InvalidQRCode,
  InvalidThirdPartyQRCode,
  PartialSHC,
} from './types';
import {readFile} from 'fs/promises';
import {resolve} from 'path';
import {DateTime} from 'luxon';

const trustedKeys = require('../../__mocks__/ruleset.json').publicKeys;

describe('QRCodeValidator', () => {
  describe('validateQR', () => {
    test('returns InvalidQRCode given non-SHC', () => {
      const validator = new QRCodeValidator();
      const expected: InvalidQRCode = {
        valid: false,
        thirdParty: false,
        multi: null,
      };
      expect(validator.validateQR(trustedKeys, '')).toStrictEqual(expected);
    });

    test.concurrent.each([
      'https://example.vaccine-ontario.ca',
      'https://verifier.vaccine-ontario.ca/?serialNumber=xxx',
    ])('returns InvalidThirdPartyQRCode given non-SHC: %s', async code => {
      const validator = new QRCodeValidator();
      const expected: InvalidThirdPartyQRCode = {
        valid: false,
        thirdParty: true,
        multi: null,
      };
      expect(validator.validateQR(trustedKeys, code)).toStrictEqual(expected);
    });

    test('returns InvalidQRCode given invalid JWT', () => {
      const invalidJWT =
        'shc:/567629595326546034602925407728043360287028647167452228092865456354646364564204085242376353653767552762603122290356432060346029304104366031222909524320603460292437404460573601104141316112667424350769405744305642033122095442307342596868694053381133210032320732687528127029640910071007067758672107220441100972452235356364086773274500772740283932706230533821655211002963670436765512033221336562544007604428686657271065564108666175661142051103066750070311657145216732653265325310126442270070580573233011764558585663775511537004426562034200504310731026115531694572073563063159453645624540726762570566063552653632687328245658265052562824693862700575207110050834263834595566226605616244604061564128567535637770360028074556366540663877600803747703616277075369347153002941065020307409775538287744092866632145677137395600250761650042434432423044706665356569617428623974422600106827665504203704055852582644400468363438123958746805286111535943075672115638414069674103266962200531724354427062727675121254755655602358425358432363046828442164585276315240404075664370415077446740367345095428695762587644324005250054210608592052702722347612251241623564361200072664772125635824666066643769052133102004303953052341290442500645380650700056352009103209380603445056243400271269211209532527630362586867412345102738544025243626532844742958764235233037302443312811300539037712033975696440702554565700065525675637636824537238372210342767105425047739220006206408674208772162277160657405206162624553756044280528202059682473100372395428753940545336050655350769526866337520777756326043310430440643774208500832680911546927082524285654332543276354557640586931587433683122372436642523430675642967733640262063276927455429405767730944666723366511437662755625536070752950681137585569403867500069246200352900234243690040357457102574016639527410602922720607270959346630723804080945275935086429002544687243603705733973207407051057775205560442682372124229032500533209062307275275091238556221243150666745322836';
      const validator = new QRCodeValidator();
      const expected: InvalidQRCode = {
        valid: false,
        thirdParty: false,
        multi: null,
      };
      expect(validator.validateQR(trustedKeys, invalidJWT)).toStrictEqual(
        expected,
      );
    });

    test('returns InvalidQRCode given invalid QR header', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'test-example-00-f-qr-code-numeric-value-0-wrong_qr_header.txt',
      );
      const expected: InvalidQRCode = {
        valid: false,
        thirdParty: false,
        multi: null,
      };
      expect(validator.validateQR(trustedKeys, qrCode)).toStrictEqual(expected);
    });

    test('returns InvalidQRCode given QR chunk index out of range', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'test-example-00-f-qr-code-numeric-value-0-index-out-of-range.txt',
      );
      const expected: InvalidQRCode = {
        valid: false,
        thirdParty: false,
        multi: null,
      };
      expect(validator.validateQR(trustedKeys, qrCode)).toStrictEqual(expected);
    });

    test('returns InvalidQRCode given invalid numeric QR with odd count', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'test-example-00-f-qr-code-numeric-value-0-odd-count.txt',
      );
      const expected: InvalidQRCode = {
        valid: false,
        thirdParty: false,
        multi: null,
      };
      expect(validator.validateQR(trustedKeys, qrCode)).toStrictEqual(expected);
    });

    test('returns CompleteSHC given a QR code larger than 1195 characters', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'test-example-00-f-qr-code-numeric-value-0-number-too-big.txt',
      );
      const payload = JSON.parse(
        await readTestData('example-00-f-jws-payload-expanded-toobig.json'),
      );
      const expected: CompleteSHC = {
        type: 'SHC',
        valid: true,
        complete: true,
        credential: payload,
        multi: null,
        name: 'John B. Anyperson',
        birthDate: '1951-01-20',
        parsedBirthDate: DateTime.fromISO('1951-01-20'),
      };
      expect(validator.validateQR(trustedKeys, qrCode)).toEqual(expected);
    });

    test('returns PartialSHC given a chunked QR code larger than 1191 characters', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'test-example-02-f-qr-code-numeric-value-0-qr_chunk_too_big.txt',
      );
      const expected: PartialSHC = {
        type: 'SHC',
        valid: true,
        complete: false,
        multi: {
          chunk: 1,
          totalChunks: 2,
          chunksScanned: [1],
        },
      };
      expect(validator.validateQR(trustedKeys, qrCode)).toStrictEqual(expected);
    });

    test('returns CompleteSHC given valid SHC', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'example-00-f-qr-code-numeric-value-0.txt',
      );
      const payload = JSON.parse(
        await readTestData('example-00-c-jws-payload-minified.json'),
      );
      const expected: CompleteSHC = {
        type: 'SHC',
        valid: true,
        complete: true,
        credential: payload,
        multi: null,
        name: 'John B. Anyperson',
        birthDate: '1951-01-20',
        parsedBirthDate: DateTime.fromISO('1951-01-20'),
      };
      expect(validator.validateQR(trustedKeys, qrCode)).toStrictEqual(expected);
    });

    test('returns CompleteSHC given a different valid SHC', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'example-01-f-qr-code-numeric-value-0.txt',
      );
      const payload = JSON.parse(
        await readTestData('example-01-c-jws-payload-minified.json'),
      );
      const expected: CompleteSHC = {
        type: 'SHC',
        valid: true,
        complete: true,
        credential: payload,
        multi: null,
        name: 'Jane C. Anyperson',
        birthDate: '1961-01-20',
        parsedBirthDate: DateTime.fromISO('1961-01-20'),
      };
      expect(validator.validateQR(trustedKeys, qrCode)).toStrictEqual(expected);
    });

    test('returns PartialSHC given a scan of a partial SHC', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'example-02-f-qr-code-numeric-value-0.txt',
      );
      const expected: PartialSHC = {
        type: 'SHC',
        valid: true,
        complete: false,
        multi: {
          chunk: 1,
          totalChunks: 3,
          chunksScanned: [1],
        },
      };
      expect(validator.validateQR(trustedKeys, qrCode)).toStrictEqual(expected);
    });
    // TODO: Write new tests for multi-chunk QR codes that end in success
    test('returns PartialSHC twice given two scans of a partial SHC', async () => {
      const validator = new QRCodeValidator();
      const qrCode1 = await readTestData(
        'example-02-f-qr-code-numeric-value-1.txt',
      );
      const qrCode2 = await readTestData(
        'example-02-f-qr-code-numeric-value-2.txt',
      );
      const expected1: PartialSHC = {
        type: 'SHC',
        valid: true,
        complete: false,
        multi: {
          chunk: 2,
          totalChunks: 3,
          chunksScanned: [2],
        },
      };
      const expected2: PartialSHC = {
        type: 'SHC',
        valid: true,
        complete: false,
        multi: {
          chunk: 3,
          totalChunks: 3,
          chunksScanned: [2, 3],
        },
      };
      expect(validator.validateQR(trustedKeys, qrCode1)).toStrictEqual(
        expected1,
      );
      expect(validator.validateQR(trustedKeys, qrCode2)).toStrictEqual(
        expected2,
      );
    });
    test('returns PartialSHC twice, then InvalidQRCode', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'example-02-f-qr-code-numeric-value-0.txt',
      );
      const qrCode1 = await readTestData(
        'example-02-f-qr-code-numeric-value-1.txt',
      );
      const qrCode2 = await readTestData(
        'example-02-f-qr-code-numeric-value-2.txt',
      );
      const expected: PartialSHC = {
        type: 'SHC',
        valid: true,
        complete: false,
        multi: {
          chunk: 1,
          totalChunks: 3,
          chunksScanned: [1],
        },
      };
      const expected1: PartialSHC = {
        type: 'SHC',
        valid: true,
        complete: false,
        multi: {
          chunk: 2,
          totalChunks: 3,
          chunksScanned: [1, 2],
        },
      };
      const expected2: InvalidQRCode = {
        valid: false,
        thirdParty: false,
        multi: {
          totalChunks: 3,
          chunksScanned: [1, 2, 3],
        },
      };
      expect(validator.validateQR(trustedKeys, qrCode)).toStrictEqual(expected);
      expect(validator.validateQR(trustedKeys, qrCode1)).toStrictEqual(
        expected1,
      );
      expect(validator.validateQR(trustedKeys, qrCode2)).toStrictEqual(
        expected2,
      );
    });
    test('also returns InvalidQRCode if scanned out of order', async () => {
      const validator = new QRCodeValidator();
      const qrCode = await readTestData(
        'example-02-f-qr-code-numeric-value-0.txt',
      );
      const qrCode1 = await readTestData(
        'example-02-f-qr-code-numeric-value-1.txt',
      );
      const qrCode2 = await readTestData(
        'example-02-f-qr-code-numeric-value-2.txt',
      );
      const expected: PartialSHC = {
        type: 'SHC',
        valid: true,
        complete: false,
        multi: {
          chunk: 2,
          totalChunks: 3,
          chunksScanned: [2],
        },
      };
      const expected1: PartialSHC = {
        type: 'SHC',
        valid: true,
        complete: false,
        multi: {
          chunk: 3,
          totalChunks: 3,
          chunksScanned: [2, 3],
        },
      };
      const expected2: InvalidQRCode = {
        valid: false,
        thirdParty: false,
        multi: {
          totalChunks: 3,
          chunksScanned: [1, 2, 3],
        },
      };
      expect(validator.validateQR(trustedKeys, qrCode1)).toStrictEqual(
        expected,
      );
      expect(validator.validateQR(trustedKeys, qrCode2)).toStrictEqual(
        expected1,
      );
      expect(validator.validateQR(trustedKeys, qrCode)).toStrictEqual(
        expected2,
      );
    });
  });
});
function readTestData(filename: string) {
  return readFile(resolve(__dirname, '../../../test-data/', filename), {
    encoding: 'utf-8',
  });
}
