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
import React, {FC, useMemo} from 'react';
import {Image, StyleSheet, SafeAreaView, View, Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useTranslation} from 'translations/i18n';

interface LogoProps {
  rightText?: string;
}

const Logo: FC<LogoProps> = ({rightText}) => {
  const I18n = useTranslation();
  const theme = useTheme();
  return useMemo(
    () => (
      <SafeAreaView
        style={[
          styles.MainContainer,
          theme.dark ? styles.MainContainerDark : undefined,
        ]}>
        <View style={styles.SubContainer}>
          <Image
            source={
              theme.dark
                ? require('assets/images/openverify_base_logo_dark.svg')
                : require('assets/images/openverify_base_logo.svg')
            }
            style={styles.OpenVerifyLogo}
            width={188}
            height={75}
            accessible
            accessibilityRole="none"
            accessibilityLabel={I18n.t('OpenVerifyLogoAlt')}
            accessibilityHint=""
          />
          <Text
            accessible={!!rightText}
            style={[
              styles.RightButtonText,
              theme.dark ? styles.RightButtonTextDark : undefined,
            ]}>
            {rightText ?? ''}
          </Text>
        </View>
        <View
          style={theme.dark ? styles.LogoSpacingDark : styles.LogoSpacing}
        />
      </SafeAreaView>
    ),
    [rightText, I18n, theme],
  );
};
export default Logo;

const styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: '#FFFFFF',
    shadowRadius: 0,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 0,
    borderBottomWidth: 0,
    minHeight: 116,
  },
  MainContainerDark: {
    backgroundColor: '#000000',
  },
  SubContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  RightButtonText: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    lineHeight: 25.6,
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginBottom: 24,
    marginRight: 24,
    color: '#1A1A1A',
  },
  RightButtonTextDark: {
    color: '#FFFFFF',
  },
  OpenVerifyLogo: {
    marginTop: 21,
    marginLeft: 3,
  },
  LogoSpacing: {
    height: 1,
    backgroundColor: '#C4C4C4',
  },
  LogoSpacingDark: {
    height: 1,
    backgroundColor: '#4D4D4D',
  },
});
