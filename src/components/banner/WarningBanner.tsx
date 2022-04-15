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
import {Image, StyleProp, ViewProps} from 'react-native';
import {useTranslation} from 'translations/i18n';
import {BodyText, ContentView, Container, B} from './styles';

interface Props {
  visible?: boolean;
  style?: StyleProp<ViewProps>;
}

const WarningBanner: FC<Props> = ({visible = false, style}) => {
  const I18n = useTranslation();

  if (!visible) {
    return null;
  }

  return (
    <Container style={style} edges={['top']}>
      <ContentView>
        <Image source={require('assets/images/warning_icon_white.svg')} />
        <BodyText>
          <B>{I18n.t('AppNotMandatory.Banner.Title')}</B>{' '}
          {I18n.t('AppNotMandatory.Banner.Body')}
        </BodyText>
      </ContentView>
    </Container>
  );
};

export default WarningBanner;
