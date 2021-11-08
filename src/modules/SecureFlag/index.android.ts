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
/**
 * This exposes the native SecureFlagModule module as a JS module. This has
 * two functions, enable() which enables FLAG_SECURE on the current activity
 * and disable() which clears the FLAG_SECURE flag.
 *
 * See FLAG_SECURE documentation at https://developer.android.com/reference/android/view/WindowManager.LayoutParams.html#FLAG_SECURE
 */
import {NativeModules} from 'react-native';
import {SecureFlagModuleInterface} from './types';
const {SecureFlagModule} = NativeModules;
export default SecureFlagModule as SecureFlagModuleInterface;
