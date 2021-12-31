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
import decodeQR, {
  validateJWT,
  validateJWSPayload,
  validateFHIRBundle,
} from './decodeQR';
import {TrustedIssuersJWKS} from './models/TrustedIssuersJWKS';
import {readFile} from 'fs/promises';
import {resolve} from 'path';
import {Settings} from 'luxon';

const trustedKeys: TrustedIssuersJWKS =
  require('../../../__mocks__/ruleset.json').publicKeys;

describe('decodeQR function', () => {
  test('Cards: valid 00 QR numeric', async () => {
    const numeric = (
      await readTestData('example-00-f-qr-code-numeric-value-0.txt')
    ).substring(5);
    decodeQR(trustedKeys, numeric);
  });
  test('Cards: valid 01 QR numeric', async () => {
    const numeric = (
      await readTestData('example-01-f-qr-code-numeric-value-0.txt')
    ).substring(5);
    decodeQR(trustedKeys, numeric);
  });
  test('Cards: invalid 02 QR numeric', async () => {
    const numeric = (
      await Promise.all(
        [0, 1, 2].map(n =>
          readTestData(`example-02-f-qr-code-numeric-value-${n}.txt`),
        ),
      )
    )
      .map(n => n.substring(9))
      .join('');
    expect(() => {
      decodeQR(trustedKeys, numeric);
    }).toThrow('invalid vc type (health-card & immunization required)');
  });
  test('fail when passed 1 digit', () => {
    expect(() => {
      decodeQR(trustedKeys, '1');
    }).toThrow('decodeQR received non-digits or an odd length of digits');
  });
  test('fail when passed 3 digits', () => {
    expect(() => {
      decodeQR(trustedKeys, '123');
    }).toThrow('decodeQR received non-digits or an odd length of digits');
  });
  test('fail when passed non-digits', () => {
    expect(() => {
      decodeQR(trustedKeys, 'xyz');
    }).toThrow('decodeQR received non-digits or an odd length of digits');
  });
  test('fail when passed both digits and non-digits', () => {
    expect(() => {
      decodeQR(trustedKeys, '12xy');
    }).toThrow('decodeQR received non-digits or an odd length of digits');
  });
  test('fail when passed an empty string', () => {
    expect(() => {
      decodeQR(trustedKeys, '');
    }).toThrow('decodeQR received non-digits or an odd length of digits');
  });
});
describe('validateJWT function', () => {
  test('Cards: valid 00 JWS', async () => {
    await shouldBeValidJWT('example-00-d-jws.txt');
  });
  test('Cards: valid 01 JWS', async () => {
    await shouldBeValidJWT('example-01-d-jws.txt');
  });
  test('fail when passed invalid JWT', () => {
    expect(() => {
      validateJWT(trustedKeys, '');
    }).toThrow('invalid JWT');
  });
  test('Cards: invalid 02 JWS', async () => {
    await shouldBeInvalidJWT(
      'example-02-d-jws.txt',
      'invalid vc type (health-card & immunization required)',
    );
  });
  test("Cards: no JWS header 'alg'", async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-no_jws_header_alg.txt',
      'invalid JWT header alg (not ES256), zip (not DEF) or missing kid',
    );
  });
  test("Cards: no JWS header 'kid'", async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-no_jws_header_kid.txt',
      'invalid JWT header alg (not ES256), zip (not DEF) or missing kid',
    );
  });
  test("Cards: no JWS header 'zip'", async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-no_jws_header_zip.txt',
      'invalid JWT header alg (not ES256), zip (not DEF) or missing kid',
    );
  });
  test("Cards: wrong JWS header 'kid'", async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-wrong_jws_header_kid.txt',
      'key not found',
    );
  });
  test('Cards: invalid signature', async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-invalid-signature.txt',
      'key not found',
    );
  });
  test('Cards: der encoded signature', async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-der-signature.txt',
      'invalid JWT signature',
    );
  });
  test('Cards: der encoded signature s-negative', async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-der-signature-s-neg.txt',
      'invalid JWT signature',
    );
  });
  test('Cards: der encoded signature r-negative', async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-der-signature-r-neg.txt',
      'invalid JWT signature',
    );
  });
  test('Cards: der encoded signature r&s negative', async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-der-signature-rs-neg.txt',
      'invalid JWT signature',
    );
  });
  test('Cards: mismatch kid/issuer', async () => {
    await shouldBeInvalidJWT(
      'test-example-00-d-jws-issuer-kid-mismatch.txt',
      'key not found',
    );
  });
  test('Cards: issuer not in trusted directory', async () => {
    const payload = await readTestData('example-00-d-jws.txt');
    const trustedIssuersJWKS = {};
    expect(() => {
      validateJWT(trustedIssuersJWKS, payload);
    }).toThrow('key not found');
  });
});
describe('validateJWSPayload function', () => {
  test('Cards: valid 00 JWS payload expanded', async () => {
    await shouldBeValidJWSPayload('example-00-b-jws-payload-expanded.json', [
      'https://spec.smarthealth.cards/examples/issuer',
    ]);
  });
  test('Cards: valid 00 JWS payload expanded with relative resource', async () => {
    await shouldBeValidJWSPayload(
      'test-example-00-b-jws-payload-expanded-relative-resource.json',
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
  test('Cards: valid 01 JWS payload expanded', async () => {
    await shouldBeValidJWSPayload('example-01-b-jws-payload-expanded.json', [
      'https://spec.smarthealth.cards/examples/issuer',
    ]);
  });
  test('Cards: invalid 02 JWS payload expanded', async () => {
    await shouldBeInvalidJWSPayload(
      'example-02-b-jws-payload-expanded.json',
      'invalid vc type (health-card & immunization required)',
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
  test('Cards: valid 00 JWS payload minified', async () => {
    await shouldBeValidJWSPayload('example-00-c-jws-payload-minified.json', [
      'https://spec.smarthealth.cards/examples/issuer',
    ]);
  });
  test('Cards: valid 01 JWS payload minified', async () => {
    await shouldBeValidJWSPayload('example-01-c-jws-payload-minified.json', [
      'https://spec.smarthealth.cards/examples/issuer',
    ]);
  });
  test('Cards: invalid 02 JWS payload minified', async () => {
    await shouldBeInvalidJWSPayload(
      'example-02-c-jws-payload-minified.json',
      'invalid vc type (health-card & immunization required)',
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
  test('Cards: not yet valid should be valid due to ignoring nbf (actually iat date)', async () => {
    await shouldBeValidJWSPayload(
      'test-example-00-b-jws-payload-expanded-nbf_not_yet_valid.json',
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
  test('Cards: nbf in milliseconds should be valid due to ignoring nbf (actually iat date)', async () => {
    await shouldBeValidJWSPayload(
      'test-example-00-b-jws-payload-expanded-nbf_milliseconds.json',
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
  test('Cards: missing immunization VC type', async () => {
    await shouldBeInvalidJWSPayload(
      'test-example-00-b-jws-payload-expanded-missing-imm-vc-type.json',
      'invalid vc type (health-card & immunization required)',
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
  test('Cards: missing covid VC type (valid)', async () => {
    await shouldBeValidJWSPayload(
      'test-example-00-b-jws-payload-expanded-missing-covid-vc-type.json',
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
  test('Cards: missing coding', async () => {
    await shouldBeInvalidJWSPayload(
      'test-example-00-b-jws-payload-expanded-missing-coding.json',
      'expected all immunizations to have vaccineCode codings',
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });

  test('Cards: missing SHC VC type', async () => {
    await shouldBeInvalidJWSPayload(
      'test-example-00-b-jws-payload-expanded-missing-shc-vc-type.json',
      'invalid vc type (health-card & immunization required)',
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
  test.skip('Cards: un-needed VC type', async () => {
    await shouldBeInvalidJWSPayload(
      'test-example-00-b-jws-payload-expanded-optional-vc-type.json',
      undefined,
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
  test.skip('Cards: unknown VC types', async () => {
    await shouldBeInvalidJWSPayload(
      'test-example-00-b-jws-payload-expanded-unknown-vc-types.json',
      undefined,
      ['https://spec.smarthealth.cards/examples/issuer'],
    );
  });
});
describe('validateFHIRBundle function', () => {
  test('Cards: valid 00 FHIR bundle', async () => {
    await shouldBeValidFHIRBundle('example-00-a-fhirBundle.json');
  });

  test('Cards: valid 01 FHIR bundle', async () => {
    await shouldBeValidFHIRBundle('example-01-a-fhirBundle.json');
  });

  test('Cards: invalid - under 12', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 0, 19).valueOf(); // 12 years old tomorrow
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '2010-01-20';
      expect(() => {
        validateFHIRBundle('', payload);
      }).toThrow('under 12 - show yellow to hide PII');
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: valid - 12 or over - just turned 12', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 0, 20).valueOf(); // 12 years old today
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '2010-01-20';
      expect(() => {
        validateFHIRBundle('', payload);
      }).not.toThrow();
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: invalid - under 12 - just turned 12 in 2020 so no grace period', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2021, 11, 30).valueOf(); // 12 years old today
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '2009-12-30';
      expect(() => {
        validateFHIRBundle('', payload);
      }).toThrow('under 12 - show yellow to hide PII');
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: valid - over 12 - just turned 12 in 2020 so no grace period', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2021, 11, 31).valueOf(); // 12 years old today
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '2009-12-30';
      expect(() => {
        validateFHIRBundle('', payload);
      }).not.toThrow();
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: valid - 12 or over - only month given and turned 12 last month', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 1, 1).valueOf();
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '2010-01';
      expect(() => {
        validateFHIRBundle('', payload);
      }).not.toThrow();
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: valid - 12 or over - only month given and turned 12 this month', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 0, 1).valueOf();
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '2010-01';
      expect(() => {
        validateFHIRBundle('', payload);
      }).not.toThrow();
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: valid - under 12 - only month given and turning 12 next month', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 0, 1).valueOf();
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '2010-02';
      expect(() => {
        validateFHIRBundle('', payload);
      }).toThrow('under 12 - show yellow to hide PII');
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: valid - 12 or over - only year given and turned 12 this year', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 0, 1).valueOf();
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '2010';
      expect(() => {
        validateFHIRBundle('', payload);
      }).not.toThrow();
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: valid - under 12 - only year given and turning 12 next year', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 0, 1).valueOf();
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '2011';
      expect(() => {
        validateFHIRBundle('', payload);
      }).toThrow('under 12 - show yellow to hide PII');
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: valid - assumed 12 or over - unexpected birthdate format', async () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 0, 1).valueOf();
    try {
      const payload = JSON.parse(
        await readTestData('example-00-a-fhirBundle.json'),
      );
      payload.entry[0].resource.birthDate = '01-2010';
      expect(() => {
        validateFHIRBundle('', payload);
      }).not.toThrow();
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Cards: invalid 02 FHIR bundle', async () => {
    await shouldBeInvalidFHIRBundle(
      'example-02-a-fhirBundle.json',
      'expected exactly one patient resource',
    );
  });

  test('Cards: valid 00 FHIR bundle with non-dm properties', async () => {
    await shouldBeValidFHIRBundle('test-example-00-a-non-dm-properties.json');
  });

  test('Cards: invalid 00 FHIR bundle with non-short refs', async () => {
    await shouldBeInvalidFHIRBundle(
      'test-example-00-a-short-refs.json',
      'expected all immunizations to be for the patient provided',
    );
  });

  test.skip('Cards: bad meta with extra key', async () => {
    await shouldBeInvalidFHIRBundle(
      'test-example-00-a-fhirBundle-bad_meta_extra_key.json',
    );
  });

  test.skip('Cards: bad meta without security key', async () => {
    await shouldBeInvalidFHIRBundle(
      'test-example-00-a-fhirBundle-bad_meta_non_security.json',
    );
  });

  test.skip('Cards: bad meta with wrong security field', async () => {
    await shouldBeInvalidFHIRBundle(
      'test-example-00-a-fhirBundle-bad_meta_wrong_security.json',
    );
  });

  test('Cards: fhir bundle with more than one patient', async () => {
    await shouldBeInvalidFHIRBundle(
      'test-example-00-a-fhirBundle-profile-usa.json',
      'expected exactly one patient resource',
    );
  });

  test('Cards: fhir bundle w/ empty elements', async () => {
    await shouldBeInvalidFHIRBundle(
      'test-example-00-a-fhirBundle-empty-values.json',
      'expected all immunizations to have vaccineCode codings',
    );
  });
});

async function shouldBeValidJWT(
  filename: string,
  trustedIssuersFilename: string = 'trusted.issuers.jwks.json',
) {
  const payload = await readTestData(filename);
  const trustedIssuersJWKS = JSON.parse(
    await readTestData(trustedIssuersFilename),
  );
  expect(() => {
    validateJWT(trustedIssuersJWKS, payload);
  }).not.toThrow();
}

async function shouldBeValidJWSPayload(filename: string, issuers: string[]) {
  const payload = JSON.parse(await readTestData(filename));
  expect(() => {
    validateJWSPayload(issuers, payload);
  }).not.toThrow();
}

async function shouldBeValidFHIRBundle(filename: string) {
  const payload = await readTestData(filename);
  expect(() => {
    validateFHIRBundle('', JSON.parse(payload));
  }).not.toThrow();
}

async function shouldBeInvalidJWT(
  filename: string,
  error: string = 'ZZZ',
  trustedIssuersFilename: string = 'trusted.issuers.jwks.json',
) {
  const payload = await readTestData(filename);
  const trustedIssuersJWKS: TrustedIssuersJWKS = JSON.parse(
    await readTestData(trustedIssuersFilename),
  );
  expect(() => {
    validateJWT(trustedIssuersJWKS, payload);
  }).toThrow(error);
}

async function shouldBeInvalidJWSPayload(
  filename: string,
  error: string = 'ZZZ',
  issuers: string[],
) {
  const payload = JSON.parse(await readTestData(filename));
  expect(() => {
    validateJWSPayload(issuers, payload);
  }).toThrow(error);
}

async function shouldBeInvalidFHIRBundle(
  filename: string,
  error: string = 'ZZZ',
) {
  const payload = await readTestData(filename);
  expect(() => {
    validateFHIRBundle('', JSON.parse(payload));
  }).toThrow(error);
}

function readTestData(filename: string) {
  return readFile(resolve(__dirname, '../../../../test-data/', filename), {
    encoding: 'utf-8',
  });
}
