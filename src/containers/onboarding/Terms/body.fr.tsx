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
  'L’application est fournie « telle quelle » et vous êtes le seul responsable de déterminer la pertinence de son utilisation.',
  'Le gouvernement de l’Ontario ne garantit pas l’exactitude des résultats obtenus grâce à l’application et n’assume aucun coût ni aucune responsabilité liés à l’utilisation de l’application.',
  'Vous ne devez pas utiliser l’application afin de conserver, sauvegarder, copier, modifier, utiliser ou divulguer toute information fournie. Cela comprend la prise de photos, de vidéos, de captures d’écran et d’enregistrements d’écran de ces renseignements.',
  'Vous ne devez pas utiliser l’application pour usurper l’identité d’une autre personne ou entité.',
  'Vous êtes responsable de la sécurité de l’appareil, du navigateur et du réseau que vous utilisez pour accéder à l’application.',
  'Les conditions d’utilisation peuvent être mises à jour à tout moment. Lorsque les conditions d’utilisation sont mises à jour, vous devrez confirmer que vous avez lu et compris les conditions d’utilisation modifiées et que vous acceptez d’y être lié.',
];

const BodyFr: FC = () => {
  const I18n = useTranslation();
  const termsOfUse = useSelector(getTermsOfUse);
  const termsOfUseValue =
    termsOfUse?.fr && termsOfUse?.fr.length > 0 ? termsOfUse?.fr : TERMS_OF_USE;

  return (
    <>
      <P>
        En utilisant cette application, vous acceptez les conditions ci-dessous
        et celles incluses dans les liens intégrés.
      </P>
      <UL>
        {termsOfUseValue.map((text: string, idx: number) => {
          return <LI key={idx}>{text}</LI>;
        })}
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
