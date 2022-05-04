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
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import {LinkText, P, UL, LI} from 'containers/settings/styles';
import openURL from 'utils/openURL';
import {useTranslation} from 'translations/i18n';
import {getTermsOfUse} from 'redux/selectors';

const TERMS_OF_USE = [
  'By using this App, you agree to the terms below and included in the embedded links.',
  'The App is provided on an “as is” basis and you are solely responsible for determining the appropriateness of using this App.',
  'The Ontario government does not warrant or guarantee the accuracy of results from the App and assumes no cost or liability associated with the use of this App.',
  'You must not use the App to retain, record, copy, modify, use or disclose any information provided. This would include taking photos, videos, screen captures and screen recordings of any such information.',
  'You must not use the App to impersonate any other person or entity.',
  'You are responsible for the security of the device, browser, and network you use to access the App.',
  'The Terms of Use may be updated at any time. If the Terms of Use are updated, you will need to confirm that you have read and understood the modified Terms of Use and agree to be bound by them.',
];

const BodyEn: FC = () => {
  const I18n = useTranslation();
  const termsOfUse = useSelector(getTermsOfUse);
  const termsOfUseValue =
    termsOfUse?.en && termsOfUse?.en.length > 0 ? termsOfUse?.en : TERMS_OF_USE;

  return (
    <>
      <UL>
        {termsOfUseValue.map((text: string, idx: number) => {
          return <LI key={idx}>{text}</LI>;
        })}
      </UL>

      <P>
        Please read the full{' '}
        <LinkText
          onPress={() => {
            openURL(
              I18n.t('Settings.SettingsScreen.MoreInformation.TermsOfUseURL'),
              true,
              I18n.t('Onboarding.Terms.TermsOfUse'),
            );
          }}>
          {I18n.t('Onboarding.Terms.TermsOfUse')}
        </LinkText>{' '}
        and{' '}
        <LinkText
          onPress={() => {
            openURL(
              I18n.t('Settings.SettingsScreen.MoreInformation.PrivacyURL'),
              true,
              I18n.t('Onboarding.Terms.Privacy'),
            );
          }}>
          {I18n.t('Onboarding.Terms.Privacy')}
        </LinkText>{' '}
        before you use the App.
      </P>
    </>
  );
};
export default BodyEn;
