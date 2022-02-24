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
import React from 'react';
import {StyleProp, TextStyle} from 'react-native';
import {useTranslation} from 'translations/i18n';

import {BulletContainer, BulletTextBullet, BulletText} from './styles';

export interface Props {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

export const Bullet = ({children, style}: Props) => {
  const I18n = useTranslation();
  return (
    <BulletContainer accessible>
      <BulletTextBullet accessibilityLabel={I18n.t('ListItem')}>
        {'●'}
      </BulletTextBullet>
      <BulletText style={style}>{children}</BulletText>
    </BulletContainer>
  );
};
