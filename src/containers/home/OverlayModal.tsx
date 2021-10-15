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
import {Modal} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {setManualUpdate} from 'redux/actions/creators';
import {fetchRulesAndAppVersion} from 'redux/actions/api';
import {
  isManualUpdate,
  isFetchingRuleset,
  isFetchingRulesetError,
  isFetchingRulesetSuccess,
} from 'redux/selectors';

import {useTranslation} from 'translations/i18n';

import {
  ModalContainer,
  ModalSubcontainer,
  ModalProgressSubcontainer,
  ModalButtonContainer,
  ModalBorderSpacing,
  ModalVerticalBorderSpacing,
  ModalButtonRegularText,
  ModalTitleText,
  ModalSubtitleText,
  ModalButtonText,
  ModalButton,
  ModalSingleButton,
} from './styles';

import * as routes from '../routes';

const OverlayModal: FC = ({}) => {
  const I18n = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

  const manualUpdate = useSelector(isManualUpdate);
  const fetchingRuleset = useSelector(isFetchingRuleset);
  const fetchingRulesetError = useSelector(isFetchingRulesetError);
  const fetchingRulesetSuccess = useSelector(isFetchingRulesetSuccess);

  const showModal =
    manualUpdate &&
    (fetchingRuleset || fetchingRulesetSuccess || fetchingRulesetError);

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
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

        {fetchingRulesetSuccess && (
          <ModalContainer>
            <ModalSubcontainer>
              <ModalTitleText>
                {I18n.t('Home.ConnectToInternet.UpdateSuccessTitle')}
              </ModalTitleText>
              <ModalSubtitleText>
                {I18n.t('Home.ConnectToInternet.UpdateSuccessSubtitle')}
              </ModalSubtitleText>
              <ModalBorderSpacing />
              <ModalSingleButton
                onPress={() => {
                  dispatch(setManualUpdate(false));

                  if (
                    navigation?.getCurrentRoute()?.name === routes.Home.Update
                  ) {
                    navigation?.reset({
                      index: 0,
                      routes: [{name: routes.Home.HomeScreen}],
                    });
                  }
                }}>
                <ModalButtonText>{I18n.t('Continue')}</ModalButtonText>
              </ModalSingleButton>
            </ModalSubcontainer>
          </ModalContainer>
        )}

        {fetchingRulesetError && (
          <ModalContainer>
            <ModalSubcontainer>
              <ModalTitleText>
                {I18n.t('Home.ConnectToInternet.UpdateFailedTitle')}
              </ModalTitleText>
              <ModalSubtitleText>
                {I18n.t('Home.ConnectToInternet.UpdateFailedSubtitle')}
              </ModalSubtitleText>
              <ModalBorderSpacing />
              <ModalButtonContainer>
                <ModalButton onPress={() => dispatch(setManualUpdate(false))}>
                  <ModalButtonText>
                    <ModalButtonRegularText>
                      {I18n.t('BackToApp')}
                    </ModalButtonRegularText>
                  </ModalButtonText>
                </ModalButton>
                <ModalVerticalBorderSpacing />
                <ModalButton
                  onPress={() => {
                    dispatch(setManualUpdate(true));
                    dispatch(fetchRulesAndAppVersion);
                  }}>
                  <ModalButtonText>{I18n.t('TryAgain')}</ModalButtonText>
                </ModalButton>
              </ModalButtonContainer>
            </ModalSubcontainer>
          </ModalContainer>
        )}
      </>
    </Modal>
  );
};
export default OverlayModal;
