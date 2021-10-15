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
import {Linking} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {trackLogEvent} from 'utils/analytics';
import {verifyEvent} from 'config/analytics';

const openURL = async (
  url: string,
  modal: boolean = true,
  linkText: string = '',
) => {
  try {
    trackLogEvent(verifyEvent.LINK_CLICK, {
      outbound: false,
      link_url: url,
      link_text: linkText,
    });
    if (await InAppBrowser.isAvailable()) {
      await InAppBrowser.open(url, {
        dismissButtonStyle: 'done',
        animated: true,
        modalPresentationStyle: 'automatic',
        modalEnabled: modal,
        enableBarCollapsing: true,
      });
    } else {
      Linking.openURL(url);
    }
  } catch (e) {
    console.error(e);
  }
};
export default openURL;
