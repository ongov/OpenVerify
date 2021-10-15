// Copyright 2021 - current In The Pocket
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE."

// Source: https://github.com/inthepocket/mobile-accessibility/blob/0bdb7a32e3fb71d741d0cd96ae593fee9fd9689f/src/hooks/useAccessibilityFocus.ts

import type {MutableRefObject} from 'react';
import {useCallback, useRef} from 'react';
import {AccessibilityInfo, findNodeHandle, Platform} from 'react-native';

/**
 * Returns a ref object which when bound to an element, will focus that
 * element in VoiceOver/TalkBack on its appearance
 */
export default function useAccessibilityFocusRef(
  platform?: typeof Platform.OS,
): [MutableRefObject<any>, () => void] {
  const ref = useRef(null);

  const setFocus = useCallback(() => {
    if (platform === undefined || Platform.OS === platform) {
      if (ref.current) {
        const focusPoint = findNodeHandle(ref.current);
        if (focusPoint) {
          AccessibilityInfo.setAccessibilityFocus(focusPoint);
        }
      }
    }
  }, [ref, platform]);

  return [ref, setFocus];
}
