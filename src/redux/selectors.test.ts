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
import {acceptedTermsAtLeastVersion} from './selectors';
import {initialState} from './reducers/index';

describe('acceptedTermsAtLeastVersion', () => {
  test('returns false when undefined', () => {
    expect(
      acceptedTermsAtLeastVersion(
        {
          app: {
            ...initialState,
            termsAcceptedVersion: undefined,
          },
        },
        1,
      ),
    ).toStrictEqual(false);
  });

  test('returns true when accepted with the same version', () => {
    expect(
      acceptedTermsAtLeastVersion(
        {
          app: {
            ...initialState,
            termsAcceptedVersion: 1,
          },
        },
        1,
      ),
    ).toStrictEqual(true);
  });

  test('returns true when accepted at a newer version', () => {
    expect(
      acceptedTermsAtLeastVersion(
        {
          app: {
            ...initialState,
            termsAcceptedVersion: 2,
          },
        },
        1,
      ),
    ).toStrictEqual(true);
  });

  test('returns false when accepted at an older version', () => {
    expect(
      acceptedTermsAtLeastVersion(
        {
          app: {
            ...initialState,
            termsAcceptedVersion: 1,
          },
        },
        2,
      ),
    ).toStrictEqual(false);
  });
});
