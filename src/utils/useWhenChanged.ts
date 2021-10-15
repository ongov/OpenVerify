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
import {useEffect, useRef, useState} from 'react';

// Based on an idea called "usePrevious" from the React team
function useWhenChanged(
  callback: (current: typeof prop, previousValue: typeof prop) => void,
  prop: any,
  initialValue?: typeof prop,
): void {
  const [internalState, setInternalState] = useState(initialValue ?? prop);
  const previousValueRef = useRef<typeof prop>();
  const previousValue = previousValueRef.current;
  if (prop !== previousValue && prop !== internalState) {
    setInternalState(prop);
    callback(prop, previousValue);
  }
  useEffect(() => {
    previousValueRef.current = prop;
  }, [prop]);
}
export default useWhenChanged;
