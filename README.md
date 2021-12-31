# Open Verify App

Open source repository for Ontario's official app **(Verify Ontario)** that is used for verifying COVID-19 vaccine certificates.

- [Overview](#overview)
- [Local setup](#local-setup)
- [Rules, Public keys and Minimum mandatory app version](#rules-public-keys-and-minimum-mandatory-app-version)
- [Vulnerability disclosure policy](#vulnerability-disclosure-policy)

## Overview

This is a React Native app and designed to work well on both Android and iOS devices.

Open Verify gives businesses and organizations a quick, easy and trusted way to scan and confirm that visitors are fully vaccinated.

The app scans the QR code on an Ontario government-issued vaccine certificate.

After scanning a QR code, the business or organization will see: a green checkmark indicating that it meets vaccine requirements, a red X for an invalid certificate, or a yellow warning indicating that the QR code cannot be read.

Open Verify also scans most government issued SMART® Health Card  QR codes. Visit [Ontario.ca/verify](https://ontario.ca/verify) for a complete list of supported jurisdictions.

## Local setup

#### 1. Clone the repository

```bash
git clone https://github.com/ongov/OpenVerify
```

#### 2. Install dependencies

```bash
cd OpenVerify
yarn install
```

#### 3. Install pods

```bash
yarn run update:pods
```

#### 4. Environment config

```bash
cp .env.template .env
```

API_URL env variable points to the URL hosting the rules, public keys and minimum mandatory app version. Adjust the value accordingly.

#### 5. Launch app (development mode)

##### iOS

```bash
yarn run ios
```

##### Android

```bash
yarn run android
```

## Rules, Public keys and Minimum mandatory app version

These are the public access endpoints for:

[Rules](https://files.ontario.ca/apps/verify/verifyRulesetON.json)

[Public keys](https://files.ontario.ca/apps/verify/verifyRulesetON.json)

[Minimum mandatory app version](https://files.ontario.ca/apps/verify/minimumVersion.json)

## Vulnerability disclosure policy

[Verify Ontario Vulnerability disclosure policy | COVID-19 (coronavirus) in Ontario](https://covid-19.ontario.ca/verify-vulnerability-disclosure)
