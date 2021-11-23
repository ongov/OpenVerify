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
export enum Home {
  HomeStack = 'HomeStack',
  HomeScreen = 'Home/HomeScreen',
  Update = 'Home/Update',
  AppUpdate = 'Home/AppUpdate',
  DateTamper = 'Home/DateTamper',
  Scanner = 'Home/Scanner',
  CameraPermission = 'Home/CameraPermission',
  TermsUpdate = 'Home/TermsUpdate',
}

export enum Common {
  CameraMissingPermission = 'Common/CameraMissingPermission',
}

export enum Results {
  InvalidResult = 'Results/InvalidResult',
  VerifiedResult = 'Results/VerifiedResult',
  UnverifiedResult = 'Results/UnverifiedResult',
  ScannerTimedOut = 'Results/ScannerTimedOut',
}

export enum Onboarding {
  WhatAppDoes = 'Onboarding/WhatAppDoes',
  WhatAppDoesNot = 'Onboarding/WhatAppDoesNot',
  Terms = 'Onboarding/Terms',
  CameraPermissions = 'Onboarding/CameraPermissions',
  AutomaticUpdates = 'Onboarding/AutomaticUpdates',
  ReadyToScan = 'Onboarding/ReadyToScan',
  AppForBusinesses = 'Onboarding/AppForBusinesses',
}

export enum Settings {
  SettingsStack = 'SettingsStack',
  SettingsScreen = 'Settings/SettingsScreen',
  Language = 'Settings/Language',
  UpdatesHelp = 'Settings/UpdatesHelp',
  VisualAppearance = 'Settings/VisualAppearance',
  HowItWorks = 'Settings/HowItWorks',
  WhatResultsMean = 'Settings/WhatResultsMean',
  HelpUsImprove = 'Settings/HelpUsImprove',
}

export type Route = Home | Common | Results | Onboarding | Settings;
