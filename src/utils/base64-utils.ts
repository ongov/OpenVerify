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
import {atob} from 'abab';
import {decode} from './base64-binary';
import {utils} from 'elliptic';

export function strToArrayOfBytes(str: string) {
  return utils.toArray(str);
}

export function toHex(arr: ArrayBuffer) {
  return utils.toHex(arr).toUpperCase();
}
export function Base64URLtoString(input: string) {
  input = input.replace(/-/g, '+');
  input = input.replace(/_/g, '/');
  return atob(input);
}
export function Base64URLtoBuffer(input: string) {
  input = input.replace(/-/g, '+');
  input = input.replace(/_/g, '/');
  return decode(input);
}
