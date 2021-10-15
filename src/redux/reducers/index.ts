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
import {DateTime} from 'luxon';
import {AppUpdateSetting, Ruleset} from 'utils/types';

import {
  ONBOARD_USER,
  SELECT_LANGUAGE,
  SYSTEM_LANGUAGE,
  SET_VISUAL_APPEARANCE,
  SET_MANUAL_UPDATE,
  SET_APP_UPDATE_SETTING,
  FETCH_RULESET_REQUEST,
  FETCH_RULESET_SUCCESS,
  FETCH_RULESET_FAILURE,
} from '../actions/types';

interface State {
  onboard: boolean;
  language: 'en' | 'fr' | undefined;
  appearance: 'system' | 'light' | 'dark';
  cameraPermission: boolean;
  manualUpdate: boolean;
  fetchingRuleset: boolean;
  fetchingRulesetSuccess: boolean;
  fetchingRulesetError: boolean;
  ruleJson: Ruleset | object;
  ruleJsonTimestamp: string | undefined;
  appUpdateSetting: AppUpdateSetting | object;
  lastCheckedForUpdate: string | undefined;
  termsAccepted: boolean;
}

const initialState: State = {
  onboard: true,
  language: undefined,
  appearance: 'system',
  cameraPermission: false,
  manualUpdate: false,
  fetchingRuleset: false,
  fetchingRulesetSuccess: false,
  fetchingRulesetError: false,
  ruleJson: {},
  ruleJsonTimestamp: undefined,
  appUpdateSetting: {},
  lastCheckedForUpdate: undefined,
  termsAccepted: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ONBOARD_USER:
      return {
        ...state,
        onboard: !action.payload,
      };
    case SELECT_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case SYSTEM_LANGUAGE:
      return {
        ...state,
        language: undefined,
      };
    case SET_VISUAL_APPEARANCE:
      return {
        ...state,
        appearance: action.payload,
      };
    case SET_MANUAL_UPDATE:
      return {
        ...state,
        manualUpdate: action.payload,
      };
    case SET_APP_UPDATE_SETTING:
      return {
        ...state,
        appUpdateSetting: action.payload,
      };
    case FETCH_RULESET_REQUEST:
      return {
        ...state,
        fetchingRuleset: true,
        fetchingRulesetError: false,
        fetchingRulesetSuccess: false,
        lastCheckedForUpdate: DateTime.now().toISO(),
      };
    case FETCH_RULESET_SUCCESS:
      return {
        ...state,
        fetchingRuleset: false,
        fetchingRulesetError: false,
        fetchingRulesetSuccess: true,
        ...action.payload,
      };
    case FETCH_RULESET_FAILURE:
      return {
        ...state,
        fetchingRuleset: false,
        fetchingRulesetError: true,
        fetchingRulesetSuccess: false,
      };
    default:
      return state;
  }
};

export default reducer;
