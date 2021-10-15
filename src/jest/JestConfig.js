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
/* eslint-env jest */
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

// Mocking the global.fetch included in React Native
global.fetch = jest.fn();

// Helper to mock a success response (only once)
global.fetch.mockResponseSuccess = body => {
  return global.fetch.mockImplementationOnce(() =>
    Promise.resolve({json: () => Promise.resolve(body)}),
  );
};

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('i18n-js', () => ({
  t: key => key,
}));

jest.mock('react-native-sound', () => {
  class SoundMock {
    constructor() {}
  }
  SoundMock.prototype.play = jest.fn();
  SoundMock.setCategory = jest.fn();
  return SoundMock;
});
jest.mock('react-native-localize', () => ({
  findBestAvailableLanguage: jest.fn(() => ({
    countryCode: undefined,
    languageTag: 'en',
    languageCode: 'en',
    isRTL: false,
  })),
}));

jest.mock('react-native-bootsplash', () => {
  return {
    hide: jest.fn().mockResolvedValueOnce(),
    show: jest.fn().mockResolvedValueOnce(),
    getVisibilityStatus: jest.fn().mockResolvedValue('hidden'),
  };
});

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  DefaultTheme: {
    colors: {},
  },
  useNavigation: jest.fn(() => {
    return {
      navigate: jest.fn(),
    };
  }),
}));

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock'),
);

jest.mock('react-native/Libraries/Vibration/Vibration', () => ({
  vibrate: jest.fn(),
}));

jest.mock('react-native-inappbrowser-reborn', () => ({
  isAvailable: jest.fn(),
  open: jest.fn(),
}));
