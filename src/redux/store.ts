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
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducer, {State} from './reducers/index';

const rootReducer = combineReducers({app: reducer});
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
export interface RootState {
  app: State;
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = () => {
  const middlewares = [thunkMiddleware];

  if (__DEV__) {
    const createDebugger = require('redux-flipper').default;
    middlewares.push(createDebugger());
  }

  const composedEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(persistedReducer, composedEnhancer);
  const persistor = persistStore(store);
  return {store, persistor};
};

export default configureStore;
