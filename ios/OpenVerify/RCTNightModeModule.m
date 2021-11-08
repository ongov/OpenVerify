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
#import "RCTNightModeModule.h"

@implementation RCTNightModeModule {
}

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setLight) {
  if (@available(iOS 13.0, *)) {
    dispatch_async(dispatch_get_main_queue(), ^{
      UIWindow *window = [[[UIApplication sharedApplication] delegate] window];
      window.overrideUserInterfaceStyle = UIUserInterfaceStyleLight;
    });
  }
}

RCT_EXPORT_METHOD(setDark) {
  if (@available(iOS 13.0, *)) {
    dispatch_async(dispatch_get_main_queue(), ^{
      UIWindow *window = [[[UIApplication sharedApplication] delegate] window];
      window.overrideUserInterfaceStyle = UIUserInterfaceStyleDark;
    });
  }
}

RCT_EXPORT_METHOD(setSystem) {
  if (@available(iOS 13.0, *)) {
    dispatch_async(dispatch_get_main_queue(), ^{
      UIWindow *window = [[[UIApplication sharedApplication] delegate] window];
      window.overrideUserInterfaceStyle = UIUserInterfaceStyleUnspecified;
    });
  }
}

@end
