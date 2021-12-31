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
import {DateTime, Settings} from 'luxon';
import withinUnder12GracePeriod from './withinUnder12GracePeriod';

describe('withinUnder12GracePeriod', () => {
  test('Should return false for undefined birthDate', () => {
    expect(withinUnder12GracePeriod(undefined)).toBe(false);
  });

  test('Should return true for under 12', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2021, 0, 19).valueOf();
    try {
      const result = withinUnder12GracePeriod(DateTime.fromISO('2010-01-20'));
      expect(result).toBe(true);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Should return true for just turned 12', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 0, 20).valueOf();
    try {
      const result = withinUnder12GracePeriod(DateTime.fromISO('2010-01-20'));
      expect(result).toBe(true);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Should return true for just turned 12 and 12 weeks', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 2, 26).valueOf();
    try {
      const result = withinUnder12GracePeriod(DateTime.fromISO('2010-01-01'));
      expect(result).toBe(true);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Should return false for 12 and 12 weeks + 1 day', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 2, 27).valueOf();
    try {
      const result = withinUnder12GracePeriod(DateTime.fromISO('2010-01-01'));
      expect(result).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Should return false for 14 year olds, for example', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2024, 0, 1).valueOf();
    try {
      const result = withinUnder12GracePeriod(DateTime.fromISO('2010-01-01'));
      expect(result).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Should return true for under 12 born in 2009', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2021, 11, 30).valueOf();
    try {
      const result = withinUnder12GracePeriod(DateTime.fromISO('2009-12-31'));
      expect(result).toBe(true);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Should return false for just turned 12 born in 2009 - to comply with regulation', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2021, 11, 31).valueOf();
    try {
      const result = withinUnder12GracePeriod(DateTime.fromISO('2009-12-31'));
      expect(result).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });

  test('Should return false for just turned 12 and 12 weeks born in 2009 - to comply with regulation', () => {
    const oldNow = Settings.now;
    Settings.now = () => new Date(2022, 2, 25).valueOf();
    try {
      const result = withinUnder12GracePeriod(DateTime.fromISO('2009-12-31'));
      expect(result).toBe(false);
    } finally {
      Settings.now = oldNow;
    }
  });
});
