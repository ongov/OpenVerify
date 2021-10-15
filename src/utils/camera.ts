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
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

export const userHasEnabledCameraPermission = async (
  platform: string,
): Promise<Boolean> => {
  try {
    const result = await check(
      platform === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    );
    switch (result) {
      case RESULTS.UNAVAILABLE:
      case RESULTS.DENIED:
      case RESULTS.LIMITED:
      case RESULTS.BLOCKED:
        return false;
      case RESULTS.GRANTED:
        return true;
      default:
        return false;
    }
  } catch (error: unknown) {
    if (__DEV__) {
      if (error instanceof Error) {
        console.log(
          `Error in the execution of userHasEnabledCameraPermission ${error?.message}`,
        );
      }
      if (typeof error === 'string') {
        console.log(
          `Error in the execution of userHasEnabledCameraPermission ${error}`,
        );
      }
    }
    return false;
  }
};
