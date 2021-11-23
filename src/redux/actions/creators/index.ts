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
import {Ruleset, AppUpdateSetting} from 'utils/types';

import {
  ONBOARD_USER,
  SELECT_LANGUAGE,
  SET_VISUAL_APPEARANCE,
  SET_MANUAL_UPDATE,
  SET_APP_UPDATE_SETTING,
  FETCH_RULESET_REQUEST,
  FETCH_RULESET_SUCCESS,
  FETCH_RULESET_FAILURE,
  ACCEPT_TERMS,
} from '../types';

export function onboardUser(onboard: boolean) {
  return {
    type: ONBOARD_USER,
    payload: onboard,
  };
}

export function selectLanguage(language: string) {
  return {
    type: SELECT_LANGUAGE,
    payload: language,
  };
}

export function setVisualAppearance(appearance: string) {
  return {
    type: SET_VISUAL_APPEARANCE,
    payload: appearance,
  };
}

export function setManualUpdate(manualUpdate: boolean) {
  return {
    type: SET_MANUAL_UPDATE,
    payload: manualUpdate,
  };
}

export function setAppUpdateSetting(appUpdateSetting: AppUpdateSetting) {
  return {
    type: SET_APP_UPDATE_SETTING,
    payload: appUpdateSetting,
  };
}

export function fetchRulesetRequest() {
  return {
    type: FETCH_RULESET_REQUEST,
  };
}

export function fetchRulesetSuccess(
  ruleJson: Ruleset,
  ruleJsonTimestamp: string,
) {
  return {
    type: FETCH_RULESET_SUCCESS,
    payload: {
      ruleJson: ruleJson,
      ruleJsonTimestamp: ruleJsonTimestamp,
    },
  };
}

export function fetchRulesetFailure(reason: 'signature' | 'network') {
  return {
    type: FETCH_RULESET_FAILURE,
    payload: reason,
  };
}

export function acceptTerms(version: number) {
  return {
    type: ACCEPT_TERMS,
    payload: version,
  };
}
