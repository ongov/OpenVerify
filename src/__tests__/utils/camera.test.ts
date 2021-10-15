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
import {userHasEnabledCameraPermission} from 'utils/camera';

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

describe('CameraUtils', () => {
  it('should return TRUE if the check result is equal GRANTED', async () => {
    jest
      .spyOn(require('react-native-permissions'), 'check')
      .mockReturnValue('granted');

    const resultForAndroid: Boolean = await userHasEnabledCameraPermission(
      'android',
    );
    const resultForIos: Boolean = await userHasEnabledCameraPermission('ios');

    expect(resultForAndroid).toBe(true);
    expect(resultForIos).toBe(true);
  });

  it('should return false if the check result is equal unavailable', async () => {
    jest
      .spyOn(require('react-native-permissions'), 'check')
      .mockReturnValue('unavailable');

    const resultForAndroid: Boolean = await userHasEnabledCameraPermission(
      'android',
    );
    const resultForIos: Boolean = await userHasEnabledCameraPermission('ios');

    expect(resultForAndroid).toBe(false);
    expect(resultForIos).toBe(false);
  });

  it('should return false if the check result is equal blocked', async () => {
    jest
      .spyOn(require('react-native-permissions'), 'check')
      .mockReturnValue('blocked');

    const resultForAndroid: Boolean = await userHasEnabledCameraPermission(
      'android',
    );
    const resultForIos: Boolean = await userHasEnabledCameraPermission('ios');

    expect(resultForAndroid).toBe(false);
    expect(resultForIos).toBe(false);
  });

  it('should return false if the check result is equal denied', async () => {
    jest
      .spyOn(require('react-native-permissions'), 'check')
      .mockReturnValue('denied');

    const resultForAndroid: Boolean = await userHasEnabledCameraPermission(
      'android',
    );
    const resultForIos: Boolean = await userHasEnabledCameraPermission('ios');

    expect(resultForAndroid).toBe(false);
    expect(resultForIos).toBe(false);
  });

  it('should return false if the check result is equal limited', async () => {
    jest
      .spyOn(require('react-native-permissions'), 'check')
      .mockReturnValue('limited');

    const resultForAndroid: Boolean = await userHasEnabledCameraPermission(
      'android',
    );
    const resultForIos: Boolean = await userHasEnabledCameraPermission('ios');

    expect(resultForAndroid).toBe(false);
    expect(resultForIos).toBe(false);
  });

  it('should return false if the check result is equal undefined', async () => {
    jest
      .spyOn(require('react-native-permissions'), 'check')
      .mockReturnValue(undefined);

    const resultForAndroid: Boolean = await userHasEnabledCameraPermission(
      'android',
    );
    const resultForIos: Boolean = await userHasEnabledCameraPermission('ios');

    expect(resultForAndroid).toBe(false);
    expect(resultForIos).toBe(false);
  });
});
