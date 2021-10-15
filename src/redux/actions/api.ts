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
import Config from 'react-native-config';
import {DateTime} from 'luxon';
import {Dispatch} from 'redux';
import {LocalConfig} from '../../config/index';
import {AppUpdateSetting, Ruleset} from 'utils/types';

import {
  setAppUpdateSetting,
  fetchRulesetRequest,
  fetchRulesetSuccess,
  fetchRulesetFailure,
} from './creators/index';

const API_URL = Config.API_URL ?? LocalConfig.API_URL;
const RULES_FILE_PATH = Config.RULES_FILE_PATH ?? LocalConfig.RULES_FILE_PATH;
const APP_VERSION_FILE_PATH =
  Config.APP_VERSION_FILE_PATH ?? LocalConfig.APP_VERSION_FILE_PATH;
const RULES_API = API_URL + RULES_FILE_PATH;
const APP_VERSION_API = API_URL + APP_VERSION_FILE_PATH;

export async function fetchRulesAndAppVersion(dispatch: Dispatch) {
  dispatch(fetchRulesetRequest());

  await fetchAppVersion(dispatch);

  await fetchRules(dispatch);
}

async function fetchAppVersion(dispatch: Dispatch) {
  try {
    const response = await fetch(APP_VERSION_API, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache',
      },
    });

    if (response.status === 200) {
      const data: AppUpdateSetting = await response.json();

      if (data) {
        return dispatch(setAppUpdateSetting(data));
      }
    }
  } catch (e) {
    // log error
  }
}

async function fetchRules(dispatch: Dispatch) {
  try {
    const response = await fetch(RULES_API, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache',
      },
    });

    if (response.status === 200) {
      const data: Ruleset = await response.json();
      const rulesetTimestamp = await response.headers.get('date');

      if (data && rulesetTimestamp) {
        // Ignoring any timestamp remanant since we only care about days
        return dispatch(
          fetchRulesetSuccess(
            data,
            DateTime.fromHTTP(rulesetTimestamp).startOf('day').toISO(),
          ),
        );
      }
    }
  } catch (e) {
    // log error
  }

  return dispatch(fetchRulesetFailure());
}
