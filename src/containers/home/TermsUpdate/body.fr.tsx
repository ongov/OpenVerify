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
import {LinkText, P, UL, LI} from 'containers/settings/styles';
import openURL from 'utils/openURL';
import {useTranslation} from 'translations/i18n';

const BodyFr: FC = () => {
  const I18n = useTranslation();

  return (
    <>
      <P>
        Les conditions d’utilisation et la déclaration de confidentialité ont
        été mises à jour afin de clarifier{' '}:
      </P>
      <UL>
        <LI>le bon usage de l’application</LI>
        <LI>le type de renseignements recueillis par l’application</LI>
      </UL>

      <P>
        Veuillez lire l’intégralité des{' '}
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
        et la{' '}
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
        avant d’utiliser l’application.
      </P>
    </>
  );
};
export default BodyFr;
