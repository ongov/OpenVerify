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
import {
  AlertText,
  SuccessContainer,
  ErrorContainer,
  WarningContainer,
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
  WarningText,
  TimeoutContainer,
  TimeoutIcon,
  TimeoutText,
} from './styles';
import {useTranslation} from 'translations/i18n';
import useForwardedRef from 'utils/useForwardedRef';

interface Props {
  text?: string;
}
export const WarningResult = React.forwardRef<any, Props>(
  ({text}, forwardedRef) => {
    const I18n = useTranslation();
    const focusRef = useForwardedRef(forwardedRef);
    return (
      <WarningContainer>
        <WarningIcon />
        <WarningText ref={focusRef}>
          {text ?? I18n.t('Results.Warning.Title')}
        </WarningText>
      </WarningContainer>
    );
  },
);

export const TimeoutResult = React.forwardRef<any, Props>(
  ({text}, forwardedRef) => {
    const I18n = useTranslation();
    const focusRef = useForwardedRef(forwardedRef);
    return (
      <TimeoutContainer>
        <TimeoutIcon />
        <TimeoutText ref={focusRef}>
          {text ?? I18n.t('Results.Timeout.Title')}
        </TimeoutText>
      </TimeoutContainer>
    );
  },
);

export const ErrorResult = React.forwardRef<any>((_, forwardedRef) => {
  const I18n = useTranslation();
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <ErrorContainer>
      <ErrorIcon />
      <AlertText ref={focusRef}>{I18n.t('Results.Error.Title')}</AlertText>
    </ErrorContainer>
  );
});

export const SuccessResult = React.forwardRef<any>((_, forwardedRef) => {
  const I18n = useTranslation();
  const focusRef = useForwardedRef(forwardedRef);
  return (
    <SuccessContainer>
      <SuccessIcon />
      <AlertText ref={focusRef}>{I18n.t('Results.Success.Title')}</AlertText>
    </SuccessContainer>
  );
});
