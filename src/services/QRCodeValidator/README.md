# QRCodeValidator

Validates QR code format, decodes, assembles partial QRs
and validates JWT format and issuer.

See also: Diagram in QRCodeValidator-architecture.pdf.

## API

QRCodeValidator has three public functions:

### Constructor

```ts
const qrCodeValidator = new QRCodeValidator();
```

QRCodeValidator is a class because it has a small bit of state --
it can automatically determine if a QR code is part of a sequence
of partial QR codes that all need to be scanned before the data can
be decoded.

QRCodeValidator keeps an array of scanned parts and tracks the total
to be scanned. But it resets this array to blank when it looks like
we're scanning a different set or individual QR codes.

### Reset

```ts
qrCodeValidator.reset();
```

Manually called to clear the state of the QRCodeValidator instance,
forcing it to forget any partial QR codes it was in the middle of
scanning.

### Validate QR

```ts
const response: QRCodeResponse = qrCodeValidator.validateQR(input /* string */);
```

Takes raw data and returns one of the following responses:
(See types.ts for details)

```ts
export type QRCodeResponse = InvalidQRCode | CompleteSHC | PartialSHC;

export interface InvalidQRCode {
  valid: false;
  multi?: MultiQRState;
}

export interface CompleteSHC {
  type: 'SHC';
  valid: true;
  complete: true;
  multi?: MultiQRState;
  credential: SHCJWTPayload;
}

export interface PartialSHC {
  type: 'SHC';
  valid: true;
  complete: false;
  multi?: MultiQRState;
}
```

Every call to validateQR might return `MultiQRState` data or `null`. Either
way, it's the current state for the multi-QR code scanning - which were
scanned, how many total to scan, and which one was just scanned (if available).

```ts
export interface MultiQRState {
  /* which one was just scanned (if applicable) */
  chunk?: number;
  /* how many total to scan */
  totalChunks: number;
  /* indexes that were scanned */
  chunksScanned: number[];
}

export interface SHCJWTPayload {
  iss: string;
  nbf: number;
  vc: object;
}
```

## Trusted issuers

These files are hard-coded for now. `trusted.issuers.jwks.json` is currently manually built.
