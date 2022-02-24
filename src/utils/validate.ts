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
import {flatten} from 'flat';
import jsonLogic from 'json-logic-js';
import {DateTime} from 'luxon';

import {Ruleset, Rule} from './types';
import {SHCJWTPayload} from '../services/QRCodeValidator/types';
import {Entry, Resource} from '../services/QRCodeValidator/lib/models/VC';

function getConditions(qrCode: SHCJWTPayload) {
  const entry = qrCode?.vc?.credentialSubject?.fhirBundle?.entry;
  const conditions = entry
    ?.filter((record: Entry) => {
      return record?.resource?.resourceType === 'Condition';
    })
    .map(record => {
      let expiryDate = record?.resource?.abatementDateTime
        ? DateTime.fromFormat(record?.resource?.abatementDateTime, 'yyyy-MM-dd')
        : undefined;
      if (!expiryDate || !expiryDate.isValid) {
        const recordedDate = record?.resource?.recordedDate
          ? DateTime.fromFormat(record?.resource?.recordedDate, 'yyyy-MM-dd')
          : undefined;
        if (recordedDate && recordedDate.isValid) {
          expiryDate = recordedDate.plus({months: 6});
        }
      }
      const duration = expiryDate?.diff(DateTime.now(), ['days']);
      return {
        ...record,
        daysUntil: duration?.days,
      };
    });
  return conditions;
}

interface RecordsToFlatten {
  daysAgo?: number;
  fullUrl?: string;
  resource?: Resource;
}

function flattenQRCode(qrCode: SHCJWTPayload) {
  const entry = qrCode?.vc?.credentialSubject?.fhirBundle?.entry;

  // Filter by resourceType since we only want "immunization" records
  const filteredImmunizations: Entry[] | undefined = entry?.filter(
    (record: Entry) => {
      return record?.resource?.resourceType?.toLowerCase() === 'immunization';
    },
  );

  // Sort coding array so that CVX is always index 0
  filteredImmunizations &&
    filteredImmunizations.forEach((record: Entry) => {
      record?.resource?.vaccineCode?.coding?.sort((a, b) => {
        return (
          (b?.system?.indexOf('/cvx') ?? 0) - (a?.system?.indexOf('/cvx') ?? 0)
        );
      });
    });

  // Compute days ago
  const immunizations: RecordsToFlatten[] = !filteredImmunizations
    ? []
    : filteredImmunizations.map((record: Entry) => {
        const duration = record?.resource?.occurrenceDateTime
          ? DateTime.now().diff(
              DateTime.fromISO(record?.resource?.occurrenceDateTime),
              ['days'],
            )
          : undefined;

        const daysAgo = duration?.days;

        if (
          qrCode.iss === 'https://covid19.quebec.ca/PreuveVaccinaleApi/issuer'
        ) {
          if (record.resource?.status === 'Completed') {
            record.resource.status = 'completed';
          }
        }

        return {
          ...record,
          daysAgo,
        };
      });

  // Sort by the order person got the vaccine doses
  immunizations.sort((a, b) => {
    return (b?.daysAgo ?? 0) - (a?.daysAgo ?? 0);
  });

  // Flatten the array
  return flatten(immunizations, {delimiter: ':'});
}

export function applyRules(ruleJson: Ruleset, qrCode: SHCJWTPayload) {
  const conditions = getConditions(qrCode);
  const qrCodeFlatten: any = flattenQRCode(qrCode);
  const rules: Rule[] = ruleJson?.ruleset ?? [];
  let verified = false;

  // Go through all available ruleset in the json
  for (let idx = 0; idx < rules.length; idx++) {
    const currentRule: Rule = rules[idx];

    // Checking if rules have not passed expiry date End of day
    const validFor: any = currentRule?.expiry
      ? DateTime.fromISO(currentRule?.expiry)
          .endOf('day')
          .diff(DateTime.now(), ['days'])
      : false;
    const expired = validFor && validFor?.values?.days <= 0;

    // Applying rules if rules not expired
    verified =
      !expired &&
      (jsonLogic.apply(currentRule.rule, conditions) ||
        jsonLogic.apply(currentRule.rule, qrCodeFlatten));

    if (verified) {
      break;
    }
  }

  return verified;
}
