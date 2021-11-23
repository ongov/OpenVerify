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
import {ScrollView} from 'react-native';
import {DateTime} from 'luxon';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector, useDispatch} from 'react-redux';
import VersionInfo from 'react-native-version-info';

import Group from 'components/settings/Group';
import Row from 'components/settings/Row';
import WarningPageAlert from 'components/core/alerts/Warning';
import FailurePageAlert from 'components/core/alerts/Error';

import {
  MainContainer,
  SubContainer,
  P,
  B,
  ConnectButton,
  TitleText,
  NoBottomMarginP,
  SpacingNoMargin,
  CopyrightLink,
} from './styles';

import * as routes from '../routes';
import {NavigatorParamList} from 'navigation/HomeNavigation';
import {useTranslation} from 'translations/i18n';

import {getVisualAppearance, getLastUpdated} from 'redux/selectors';
import {fetchRulesAndAppVersion} from 'redux/actions/api';
import {setManualUpdate, onboardUser} from 'redux/actions/creators';
import {showRedWarning, showYellowWarning} from 'utils/rulesHelper';
import useAccessibilityFocusRef from 'utils/useAccessibilityFocusRef';
import {useFocusEffect} from '@react-navigation/core';

type Props = NativeStackScreenProps<
  NavigatorParamList,
  routes.Settings.SettingsScreen
>;

const SettingsScreen: FC<Props> = () => {
  const I18n = useTranslation();
  const [focusRef, setFocus] = useAccessibilityFocusRef();
  useFocusEffect(() => {
    setTimeout(setFocus, 100);
  });
  const appearance = useSelector(getVisualAppearance);
  const lastUpdated = useSelector(getLastUpdated);
  const dispatch = useDispatch();

  const yellowWarning =
    lastUpdated !== undefined ? showYellowWarning(lastUpdated) : false;
  const redWarning =
    lastUpdated !== undefined ? showRedWarning(lastUpdated) : false;

  return (
    <MainContainer>
      <ScrollView>
        <SubContainer>
          <TitleText ref={focusRef}>
            {I18n.t('Settings.SettingsScreen.Title')}
          </TitleText>
          <SpacingNoMargin />
        </SubContainer>
        <Group title={I18n.t('Settings.SettingsScreen.AppVersion.Title')}>
          <SubContainer>
            <NoBottomMarginP>
              {I18n.t('Settings.SettingsScreen.AppVersion.Build', {
                version: VersionInfo.appVersion,
                build: VersionInfo.buildVersion,
              })}
            </NoBottomMarginP>
          </SubContainer>
        </Group>
        <Group title={I18n.t('Settings.SettingsScreen.Updating.Title')}>
          <SubContainer>
            <NoBottomMarginP>
              {lastUpdated
                ? DateTime.fromISO(lastUpdated)
                    .setLocale(I18n.locale)
                    .toLocaleString(DateTime.DATE_FULL)
                : I18n.t('Settings.SettingsScreen.Updating.Never')}
            </NoBottomMarginP>
            {redWarning ? (
              <FailurePageAlert title={I18n.t('Home.ConnectToInternet.Title')}>
                <P>
                  {I18n.t('Home.ConnectToInternet.Subtitle.Part1')}
                  <B>{I18n.t('Home.ConnectToInternet.Subtitle.Part2')}</B>
                  {I18n.t('Home.ConnectToInternet.Subtitle.Part3')}
                </P>
              </FailurePageAlert>
            ) : yellowWarning ? (
              <WarningPageAlert title={I18n.t('Home.ConnectToInternet.Title')}>
                <P>
                  {I18n.t('Home.ConnectToInternet.Subtitle.Part1')}
                  <B>{I18n.t('Home.ConnectToInternet.Subtitle.Part2')}</B>
                  {I18n.t('Home.ConnectToInternet.Subtitle.Part3')}
                </P>
              </WarningPageAlert>
            ) : undefined}
            <ConnectButton
              onPress={() => {
                dispatch(setManualUpdate(true));
                dispatch(fetchRulesAndAppVersion);
              }}>
              {I18n.t('Settings.SettingsScreen.Updating.ConnectForUpdates')}
            </ConnectButton>
            <SpacingNoMargin />
          </SubContainer>
        </Group>
        <Group title={I18n.t('Settings.SettingsScreen.AppSettings.Title')}>
          <Row
            name={I18n.t('Settings.Language.Title')}
            value={
              I18n.locale === 'fr'
                ? I18n.t('Settings.Language.French')
                : I18n.t('Settings.Language.English')
            }
            screen={routes.Settings.Language}
          />
          <Row
            name={I18n.t('Settings.VisualAppearance.Title')}
            value={
              appearance === 'light'
                ? I18n.t('Settings.VisualAppearance.Light')
                : appearance === 'dark'
                ? I18n.t('Settings.VisualAppearance.Dark')
                : I18n.t('Settings.SettingsScreen.AppSettings.SameAsSystem')
            }
            screen={routes.Settings.VisualAppearance}
          />
        </Group>
        <Group title={I18n.t('Settings.SettingsScreen.Help.Title')}>
          <Row
            name={I18n.t('Settings.UpdatesHelp.Title')}
            screen={routes.Settings.UpdatesHelp}
          />
          <Row
            name={I18n.t('Settings.HowItWorks.Title')}
            screen={routes.Settings.HowItWorks}
          />
          <Row
            name={I18n.t('Settings.WhatResultsMean.Title')}
            screen={routes.Settings.WhatResultsMean}
          />
          <Row
            name={I18n.t('Settings.HelpUsImprove.Title')}
            screen={routes.Settings.HelpUsImprove}
          />
          <SubContainer>
            <ConnectButton
              buttonType="secondary"
              onPress={() => {
                dispatch(onboardUser(false));
              }}>
              {I18n.t('Settings.SettingsScreen.ReviewAppSetup')}
            </ConnectButton>
          </SubContainer>
        </Group>
        <Group title={I18n.t('Settings.SettingsScreen.MoreInformation.Title')}>
          <Row
            name={I18n.t('Settings.SettingsScreen.MoreInformation.TermsOfUse')}
            url={I18n.t(
              'Settings.SettingsScreen.MoreInformation.TermsOfUseURL',
            )}
          />
          <Row
            name={I18n.t('Settings.SettingsScreen.MoreInformation.Privacy')}
            url={I18n.t('Settings.SettingsScreen.MoreInformation.PrivacyURL')}
          />
          <Row
            name={I18n.t(
              'Settings.SettingsScreen.MoreInformation.VulnDisclosurePolicy',
            )}
            url={I18n.t(
              'Settings.SettingsScreen.MoreInformation.VulnDisclosurePolicyURL',
            )}
          />
          <Row
            name={I18n.t(
              'Settings.SettingsScreen.MoreInformation.Accessibility',
            )}
            url={I18n.t(
              'Settings.SettingsScreen.MoreInformation.AccessibilityURL',
            )}
          />
          <Row
            name={I18n.t('Settings.SettingsScreen.MoreInformation.ContactUs')}
            url={I18n.t('Settings.SettingsScreen.MoreInformation.ContactUsURL')}
          />
        </Group>
        <SubContainer>
          <CopyrightLink
            url={I18n.t(
              'Settings.SettingsScreen.MoreInformation.CopyrightURL',
            )}>
            {I18n.t('Settings.SettingsScreen.MoreInformation.Copyright', {
              year: new Date().getFullYear(),
            })}
          </CopyrightLink>
        </SubContainer>
      </ScrollView>
    </MainContainer>
  );
};

export default SettingsScreen;
