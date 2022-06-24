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
import {checkAppUpdate} from 'utils/rulesHelper';
import VersionInfo from 'react-native-version-info';

const VersionInfoMock = VersionInfo;

describe('Test checkAppUpdate from RulesHelper', () => {
  it('should return false for empty appSettings', () => {
    expect(checkAppUpdate({})).toBe(false);
  });

  it('should return false if effective date is in future', () => {
    VersionInfoMock.appVersion = '1.0.0';

    const appSettings = {
      effectiveDate: '2025-12-01',
      minimumMandatoryVersion: '1.2.2',
    };
    expect(checkAppUpdate(appSettings)).toBe(false);
  });

  it('should return true if version is less then minimumMandatoryVersion and effective date is less then or equal to today.', () => {
    VersionInfoMock.appVersion = '1.0.0';

    const appSettings = {
      effectiveDate: '2021-12-23',
      minimumMandatoryVersion: '1.2.2',
    };
    expect(checkAppUpdate(appSettings)).toBe(true);
  });

  it('should return false if version is equal to minimumMandatoryVersion and effective date is less then or equal to today.', () => {
    VersionInfoMock.appVersion = '1.2.2';

    const appSettings = {
      effectiveDate: '2021-12-23',
      minimumMandatoryVersion: '1.2.2',
    };
    expect(checkAppUpdate(appSettings)).toBe(false);
  });

  it('should return false if version is greater then minimumMandatoryVersion and effective date is less then or equal to today.', () => {
    VersionInfoMock.appVersion = '2.2.1';

    const appSettings = {
      effectiveDate: '2021-12-23',
      minimumMandatoryVersion: '1.2.2',
    };
    expect(checkAppUpdate(appSettings)).toBe(false);
  });

  it('Tests agains productions build', () => {
    const appSettings = {
      effectiveDate: '2022-03-01',
      minimumMandatoryVersion: '1.2.3',
    };

    VersionInfoMock.appVersion = '1.0';
    expect(checkAppUpdate(appSettings)).toBe(true);

    VersionInfoMock.appVersion = '1.0.1';
    expect(checkAppUpdate(appSettings)).toBe(true);

    VersionInfoMock.appVersion = '1.1';
    expect(checkAppUpdate(appSettings)).toBe(true);

    VersionInfoMock.appVersion = '1.1.1';
    expect(checkAppUpdate(appSettings)).toBe(true);

    VersionInfoMock.appVersion = '1.1.2';
    expect(checkAppUpdate(appSettings)).toBe(true);

    VersionInfoMock.appVersion = '1.2';
    expect(checkAppUpdate(appSettings)).toBe(true);

    VersionInfoMock.appVersion = '1.2.1';
    expect(checkAppUpdate(appSettings)).toBe(true);

    VersionInfoMock.appVersion = '1.2.2';
    expect(checkAppUpdate(appSettings)).toBe(true);

    VersionInfoMock.appVersion = '1.2.3';
    expect(checkAppUpdate(appSettings)).toBe(false);

    VersionInfoMock.appVersion = '1.2.6';
    expect(checkAppUpdate(appSettings)).toBe(false);

    VersionInfoMock.appVersion = '1.3.0';
    expect(checkAppUpdate(appSettings)).toBe(false);
  });
});
