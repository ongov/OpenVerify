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
import {RootState} from './store';
import * as RNLocalize from 'react-native-localize';

export const getLanguage = (state: RootState) =>
  state.app.language ??
  RNLocalize.findBestAvailableLanguage(['en', 'fr'])?.languageTag ??
  'en';
export const getVisualAppearance = (state: RootState) =>
  state.app.appearance ?? 'system';
export const getLastUpdated = (state: RootState) => state.app.ruleJsonTimestamp;
export const isFetchingRuleset = (state: RootState) =>
  state.app.fetchingRuleset;
export const isFetchingRulesetError = (state: RootState) =>
  state.app.fetchingRulesetError;
export const getFetchingRulesetErrorReason = (state: RootState) =>
  state.app.fetchingRulesetErrorReason;
export const isFetchingRulesetSuccess = (state: RootState) =>
  state.app.fetchingRulesetSuccess;
export const isManualUpdate = (state: RootState) => state.app.manualUpdate;
export const getLastCheckedForUpdate = (state: RootState) =>
  state.app.lastCheckedForUpdate;
export const getRuleJson = (state: RootState) => state.app.ruleJson;
export const getAppUpdateSetting = (state: RootState) =>
  state.app.appUpdateSetting;
export const getTermsOfUse = (state: RootState) => {
  return state.app.ruleJson?.termsOfUse;
};
export const acceptedTermsAtLeastVersion = (
  state: RootState,
  version: number,
): boolean => {
  return (
    !!state.app.termsAcceptedVersion &&
    state.app.termsAcceptedVersion >= version
  );
};
