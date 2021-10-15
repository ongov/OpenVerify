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
const getLocales = () => [
  // you can choose / add the locales you want
  {countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false},
  {countryCode: 'FR', languageTag: 'fr-FR', languageCode: 'fr', isRTL: false},
];

// use a provided translation, or return undefined to test your fallback
const findBestAvailableLanguage = () => ({
  languageTag: 'en-US',
  isRTL: false,
});

const getNumberFormatSettings = () => ({
  decimalSeparator: '.',
  groupingSeparator: ',',
});

const getCalendar = () => 'gregorian'; // or "japanese", "buddhist"
const getCountry = () => 'US'; // the country code you want
const getCurrencies = () => ['USD', 'EUR']; // can be empty array
const getTemperatureUnit = () => 'celsius'; // or "fahrenheit"
const getTimeZone = () => 'Europe/Paris'; // the timezone you want
const uses24HourClock = () => true;
const usesMetricSystem = () => true;

const addEventListener = jest.fn();
const removeEventListener = jest.fn();

export {
  findBestAvailableLanguage,
  getLocales,
  getNumberFormatSettings,
  getCalendar,
  getCountry,
  getCurrencies,
  getTemperatureUnit,
  getTimeZone,
  uses24HourClock,
  usesMetricSystem,
  addEventListener,
  removeEventListener,
};
