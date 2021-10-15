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
import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import React, {FC, useContext} from 'react';
import en from './en.json';
import fr from './fr.json';
import {getLanguage} from 'redux/selectors';
import {useSelector} from 'react-redux';

i18n.fallbacks = true;
i18n.defaultLocale = 'en';
i18n.translations = {en, fr};
i18n.locale =
  RNLocalize.findBestAvailableLanguage(['en', 'fr'])?.languageTag ?? 'en';

// For tests which don't want to deal with redux or context
export const I18nForTests = i18n;

// It's not clear why, but the t() function doesn't know right away
// when locale changes, so we pass locale as a translation option...
export const TranslationContext = React.createContext({
  t: (scope: i18n.Scope, options?: i18n.TranslateOptions | undefined): string =>
    i18n.t(scope, {locale: i18n.locale, ...options}),
  locale: i18n.locale,
});

interface Props {
  children: React.ReactNode;
}

export const TranslationProvider: FC<Props> = ({children}) => {
  i18n.locale = useSelector(getLanguage);
  return (
    <TranslationContext.Provider
      value={{
        t: (
          scope: i18n.Scope,
          options?: i18n.TranslateOptions | undefined,
        ): string => i18n.t(scope, {locale: i18n.locale, ...options}),
        locale: i18n.locale,
      }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);
