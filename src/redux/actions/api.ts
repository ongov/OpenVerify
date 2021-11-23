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
import {LocalConfig} from 'config/index';

import {
  setAppUpdateSetting,
  fetchRulesetRequest,
  fetchRulesetSuccess,
  fetchRulesetFailure,
} from './creators/index';
import RulesetSignatureValidator from 'services/RulesetSignatureValidator';

const API_URL = Config.API_URL ?? LocalConfig.API_URL;
const RULES_FILE_PATH = Config.RULES_FILE_PATH ?? LocalConfig.RULES_FILE_PATH;
const RULES_API = API_URL + RULES_FILE_PATH;

export async function fetchRulesAndAppVersion(dispatch: Dispatch) {
  dispatch(fetchRulesetRequest());

  try {
    // eslint-disable-next-line no-undef
    const controller = new AbortController();
    const signal = controller.signal;

    const abortTimeout = setTimeout(() => {
      controller.abort();
      dispatch(fetchRulesetFailure('network'));
      console.debug('Aborted network request.');
    }, 5000);

    const response = await fetch(RULES_API, {
      signal,
      method: 'GET',
      mode: 'no-cors',
      headers: {
        pragma: 'no-cache',
        'cache-control': 'no-cache',
      },
    });

    clearTimeout(abortTimeout);

    if (response.status === 200) {
      const jws: string = await response.text();
      const rulesetTimestamp = await response.headers.get('date');

      let data;
      try {
        data = RulesetSignatureValidator(jws);
      } catch (e) {
        console.debug(e);
        return dispatch(fetchRulesetFailure('signature'));
      }

      if (data && rulesetTimestamp && data.minimumVersion) {
        dispatch(setAppUpdateSetting(data.minimumVersion));
        // Ignoring any timestamp remanant since we only care about days
        return dispatch(
          fetchRulesetSuccess(
            data,
            DateTime.fromHTTP(rulesetTimestamp).startOf('day').toISO(),
          ),
        );
      }
    }

    return dispatch(fetchRulesetFailure('network'));
  } catch (e) {
    console.debug(e);
  }
}
