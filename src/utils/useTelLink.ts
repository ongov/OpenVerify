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
import {useState, useEffect} from 'react';
import {Linking} from 'react-native';

const useTelLink = (number: string) => {
  const [telLink, setTelLink] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        if (await Linking.canOpenURL(`telprompt:${number}`)) {
          setTelLink(`telprompt:${number}`);
        } else if (await Linking.canOpenURL(`tel:${number}`)) {
          setTelLink(`tel:${number}`);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [number]);
  return telLink;
};
export default useTelLink;
