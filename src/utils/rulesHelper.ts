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
import VersionInfo from 'react-native-version-info';
import {DateTime} from 'luxon';
import {LocalConfig} from '../config/index';
import {AppUpdateSetting} from './types';

const UPDATE_INTERVAL_CHECK = parseFloat(LocalConfig.UPDATE_INTERVAL_CHECK);
const ALERT_INTERVAL_MIN = parseFloat(LocalConfig.ALERT_INTERVAL_MIN);
const ALERT_INTERVAL_MAX = parseFloat(LocalConfig.ALERT_INTERVAL_MAX);
const WARNING_INTERVAL_MIN = parseFloat(LocalConfig.WARNING_INTERVAL_MIN);
const WARNING_INTERVAL_MAX = parseFloat(LocalConfig.WARNING_INTERVAL_MAX);
const EXPIRED_INTERVAL = parseFloat(LocalConfig.EXPIRED_INTERVAL);

export function getRulesUpdatedAgo(ruleJsonTimestamp: string) {
  // If rules expired or empty then Update page
  const {days} = DateTime.now()
    .startOf('day')
    .diff(DateTime.fromISO(ruleJsonTimestamp), ['days'])
    .toObject();

  /*
    If ruleJsonTimestamp is not valid and we get undefined
    we want to force the user to "Connect to internet" page using a
    large number. e.g. 365 days in future will make sure this happens
  */
  if (days === undefined) {
    return 365;
  }

  return Math.ceil(days);
}

export function showYellowWarning(ruleJsonTimestamp: string) {
  const updatedAgo = getRulesUpdatedAgo(ruleJsonTimestamp);
  return (
    updatedAgo >= WARNING_INTERVAL_MIN && updatedAgo <= WARNING_INTERVAL_MAX
  );
}

export function showRedWarning(ruleJsonTimestamp: string) {
  const updatedAgo = getRulesUpdatedAgo(ruleJsonTimestamp);
  return updatedAgo >= ALERT_INTERVAL_MIN && updatedAgo <= ALERT_INTERVAL_MAX;
}

export function isExpired(ruleJsonTimestamp: string) {
  const updatedAgo = getRulesUpdatedAgo(ruleJsonTimestamp);
  return updatedAgo >= EXPIRED_INTERVAL;
}

export function isDateTampered(ruleJsonTimestamp: string) {
  const updatedAgo = getRulesUpdatedAgo(ruleJsonTimestamp);
  return updatedAgo < 0.0;
}

export function allowRulesUpdate(lastCheckedForUpdate: string) {
  const {hours} = DateTime.fromISO(lastCheckedForUpdate)
    .diffNow(['hours'])
    .toObject();

  // Always allow update call if somebody tampered with system time i.e. hours < -1
  return hours && Math.ceil(hours) >= UPDATE_INTERVAL_CHECK;
}

export function checkAppUpdate(appUpdateSetting: AppUpdateSetting) {
  if (appUpdateSetting?.effectiveDate === undefined) {
    return false;
  }
  const {days} = DateTime.fromISO(appUpdateSetting?.effectiveDate)
    .diffNow(['days'])
    .toObject();

  // If effective date
  if ((days !== undefined || days === 0) && Math.ceil(days) <= 0) {
    const minimumMandatoryVersion = appUpdateSetting?.minimumMandatoryVersion
      ? appUpdateSetting?.minimumMandatoryVersion.split('.')
      : [];

    const currentVersion = VersionInfo.appVersion
      ? VersionInfo.appVersion.split('.')
      : [];

    // Compare version
    for (let idx = 0; idx < minimumMandatoryVersion.length; idx++) {
      const currVersion =
        currentVersion.length > idx ? currentVersion[idx] : '0';
      if (
        parseInt(minimumMandatoryVersion[idx], 10) > parseInt(currVersion, 10)
      ) {
        return true;
      }
    }
  }

  return false;
}

export const shouldAllowPaperVaccineProof = (): boolean => {
  const POLICY_EFFECTIVE_DATE = '2022-01-04';
  const newPolicyDate = DateTime.fromISO(POLICY_EFFECTIVE_DATE);
  const now = DateTime.now();

  return now < newPolicyDate;
};
