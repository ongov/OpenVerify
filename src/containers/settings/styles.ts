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
import styled from 'styled-components/native';
import {Button} from 'components/core/button';
import {Bullet} from 'components/core/bullet';
import Link from 'components/settings/Link';
import SuccessPageAlert from 'components/core/alerts/Success';
import FailurePageAlert from 'components/core/alerts/Error';
import WarningPageAlert from 'components/core/alerts/Warning';

export const MainContainer = styled.SafeAreaView`
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  background-color: ${({theme}) => theme.colors.background};
`;

export const SubContainer = styled.View`
  padding-horizontal: ${({theme}) => theme.variables.spacing.lg}px;
`;

export const PageContainer = styled.View`
  padding-horizontal: ${({theme}) => theme.variables.spacing.lg}px;
  padding-bottom: ${({theme}) => theme.variables.spacing.xlg}px;
`;

export const BottomContainer = styled.View`
  padding-horizontal: ${({theme}) => theme.variables.spacing.lg}px;
  padding-bottom: ${({theme}) => theme.variables.spacing.xmd}px;
`;

export const ConnectButton = styled(Button)`
  margin-top: ${({theme}) => theme.variables.spacing.xmd - 1}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.md}px;
`;

export const TitleText = styled.Text.attrs(() => ({
  accessibilityRole: 'header',
}))`
  font-family: ${({theme}) => theme.typography.fonts.ralewayBold};
  letter-spacing: ${({theme}) => theme.typography.letterSpacing.title}px;
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.header2}px;
  line-height: ${({theme}) => theme.typography.lineHeights.xlg}px;
  margin-top: ${({theme}) => theme.variables.spacing.md}px;
`;

export const SubtitleText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.ralewayRegular};
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.lineHeights.lg}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.md + 4}px;
`;

export const SubtitleTextOpenSans = styled(SubtitleText)`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
`;

export const SubtitleTextBold = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.ralewayBold};
`;

export const Spacing = styled.View`
  height: ${({theme}) => theme.variables.borders.xsm}px;
  margin-top: ${({theme}) => theme.variables.spacing.md + 1}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.md + 7}px;
  background-color: ${({theme}) => theme.colors.border};
`;

export const Line = styled.View`
  height: ${({theme}) => theme.variables.borders.xsm}px;
  margin-top: ${({theme}) => theme.variables.spacing.md + 1}px;
  background-color: ${({theme}) => theme.colors.border};
`;

export const RadioSpacing = styled(Spacing)`
  margin-bottom: ${({theme}) => theme.variables.spacing.md + 2}px;
`;

export const ResultDescription = styled(SubContainer)`
  margin-vertical: ${({theme}) => theme.variables.spacing.lg}px;
`;
export const ResultDescriptionLast = styled(SubContainer)`
  margin-top: ${({theme}) => theme.variables.spacing.lg}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.sm}px;
`;

export const SpacingNoMargin = styled(Spacing)`
  margin-bottom: 0px;
`;

export const P = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  margin-bottom: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.fontSizes.body * 1.5}px;
  color: ${({theme}) => theme.colors.text};
`;
export const NoBottomMarginP = styled(P)`
  margin-bottom: 0;
`;

export const UL = styled.View`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  margin-bottom: ${({theme}) => theme.typography.fontSizes.body}px;
`;
export const LI = styled(Bullet)`
  font-family: ${({theme}) => theme.typography.fonts.openSansRegular};
  font-size: ${({theme}) => theme.typography.fontSizes.body}px;
  line-height: ${({theme}) => theme.typography.fontSizes.body * 1.5}px;
`;
export const B = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.openSansBold};
`;
export const CopyrightLink = styled(Link)`
  margin-vertical: ${({theme}) => theme.typography.fontSizes.body}px;
`;
export const VerifiedResult = styled(SuccessPageAlert)`
  margin: 0px;
  margin-top: ${({theme}) => theme.variables.spacing.md}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.md}px;
`;
export const FailedVerificationResult = styled(FailurePageAlert)`
  margin: 0px;
  margin-bottom: ${({theme}) => theme.variables.spacing.md}px;
`;
export const CannotBeScannedResult = styled(WarningPageAlert)`
  margin: 0px;
  margin-bottom: ${({theme}) => theme.variables.spacing.lg}px;
`;
export const Indented = styled.View`
  margin-left: ${({theme}) => theme.variables.spacing.lg}px;
`;
export const LinkText = styled.Text.attrs({
  accessible: true,
  accessibilityRole: 'link',
})`
  color: ${({theme}) => theme.colors.linkColor};
  text-decoration: underline;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-color: ${({theme}) => theme.colors.linkColor};
`;
export const HeadingText = styled.Text`
  font-family: ${({theme}) => theme.typography.fonts.ralewayBold};
  letter-spacing: ${({theme}) => theme.typography.letterSpacing.title}px;
  color: ${({theme}) => theme.colors.text};
  font-size: ${({theme}) => theme.typography.fontSizes.header4}px;
  line-height: ${({theme}) => theme.typography.fontSizes.header4 * 1.4}px;
  margin-bottom: ${({theme}) => theme.variables.spacing.sm}px;
`;
