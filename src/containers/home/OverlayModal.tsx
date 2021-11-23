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
import React, {FC, useEffect} from 'react';
import {Modal, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setManualUpdate} from 'redux/actions/creators';
import {fetchRulesAndAppVersion} from 'redux/actions/api';
import {
  isManualUpdate,
  isFetchingRuleset,
  isFetchingRulesetError,
  getFetchingRulesetErrorReason,
  isFetchingRulesetSuccess,
} from 'redux/selectors';

import {useTranslation} from 'translations/i18n';

import {
  ModalContainer,
  ModalProgressSubcontainer,
  ModalTitleText,
} from './styles';

import * as routes from '../routes';

const OverlayModal: FC = ({}) => {
  const I18n = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const manualUpdate = useSelector(isManualUpdate);
  const fetchingRuleset = useSelector(isFetchingRuleset);
  const fetchingRulesetError = useSelector(isFetchingRulesetError);
  const fetchingRulesetErrorReason = useSelector(getFetchingRulesetErrorReason);
  const fetchingRulesetSuccess = useSelector(isFetchingRulesetSuccess);

  const showModal = manualUpdate && fetchingRuleset;

  useEffect(() => {
    if (manualUpdate) {
      if (fetchingRulesetSuccess) {
        Alert.alert(
          I18n.t('Home.ConnectToInternet.UpdateSuccessTitle'),
          I18n.t('Home.ConnectToInternet.UpdateSuccessSubtitle'),
          [
            {
              text: I18n.t('Continue'),
              onPress: () => {
                dispatch(setManualUpdate(false));

                if (
                  navigation?.getCurrentRoute()?.name === routes.Home.Update
                ) {
                  navigation?.reset({
                    index: 0,
                    routes: [{name: routes.Home.HomeScreen}],
                  });
                }
              },
            },
          ],
        );
      }
      if (fetchingRulesetError) {
        const signatureError = fetchingRulesetErrorReason === 'signature';
        const title = signatureError
          ? I18n.t('Home.ConnectToInternet.UpdateFailedSignatureTitle')
          : I18n.t('Home.ConnectToInternet.UpdateFailedTitle');
        const subtitle = signatureError
          ? I18n.t('Home.ConnectToInternet.UpdateFailedSignatureSubtitle')
          : I18n.t('Home.ConnectToInternet.UpdateFailedSubtitle');
        Alert.alert(title, subtitle, [
          {
            text: I18n.t('BackToApp'),
            onPress: () => dispatch(setManualUpdate(false)),
            style: 'cancel',
          },
          {
            text: I18n.t('TryAgain'),
            onPress: () => {
              dispatch(setManualUpdate(true));
              dispatch(fetchRulesAndAppVersion);
            },
          },
        ]);
      }
    }
  }, [
    I18n,
    dispatch,
    fetchingRulesetSuccess,
    fetchingRulesetError,
    fetchingRulesetErrorReason,
    manualUpdate,
    navigation,
  ]);

  return (
    <Modal animationType="none" transparent={true} visible={showModal}>
      <>
        {fetchingRuleset && (
          <ModalContainer>
            <ModalProgressSubcontainer>
              <ModalTitleText>
                {I18n.t('Home.ConnectToInternet.CheckingForUpdate')}
              </ModalTitleText>
            </ModalProgressSubcontainer>
          </ModalContainer>
        )}
      </>
    </Modal>
  );
};
export default OverlayModal;
