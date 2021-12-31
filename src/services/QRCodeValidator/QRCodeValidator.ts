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
import {QRCodeResponse, CompleteSHC, PartialSHC} from './types';
import decodeQR from './lib/decodeQR';
import {TrustedIssuersJWKS} from './lib/models/TrustedIssuersJWKS';

const SHCRegex =
  /^shc:\/((?<chunk>\d+)\/(?<totalChunks>\d+)\/){0,1}(?<numbers>(\d{2})+)$/;

export default class QRCodeValidator {
  #chunks: Map<number, string> = new Map();
  #totalChunks: number | undefined;
  constructor() {}
  reset() {
    this.#chunks.clear();
    this.#totalChunks = undefined;
  }
  validateQR(
    trustedIssuersJWKS: TrustedIssuersJWKS,
    input: string,
  ): QRCodeResponse {
    try {
      const match = input.match(SHCRegex);
      if (!match || !match.groups) {
        throw 'Not a QR code we expect';
      }
      const numbers = match.groups?.numbers ?? '';
      // Single QR code
      if (match.groups.chunk === undefined) {
        // This is a single QR code so reset any previously scanned multi-code
        this.reset();
        const {credential, name, birthDate, parsedBirthDate} = decodeQR(
          trustedIssuersJWKS,
          numbers,
        );
        const response: CompleteSHC = {
          valid: true,
          complete: true,
          type: 'SHC',
          credential,
          name,
          birthDate,
          parsedBirthDate,
          multi: null,
        };
        return response;
      }
      const chunk = parseInt(match.groups.chunk ?? '1', 10);
      const totalChunks = parseInt(match.groups.totalChunks ?? '1', 10);
      // Sanity check for chunk numbers in QR code...
      if (chunk < 1 || totalChunks < 1 || chunk > totalChunks) {
        throw 'Chunk numbers did not pass sanity check';
      }
      // Is this what we were expecting or a new set of chunks to scan?
      if (
        (this.#totalChunks !== undefined &&
          totalChunks !== this.#totalChunks) ||
        (this.#chunks.has(chunk) && this.#chunks.get(chunk) !== numbers)
      ) {
        this.reset();
      }
      // Store the chunk so we can keep scanning...
      if (!this.#chunks.has(chunk)) {
        this.#chunks.set(chunk, numbers);
      }
      this.#totalChunks = totalChunks;
      // Are we done, do we have all the chunks?
      if (this.#chunks.size >= totalChunks) {
        const orderedChunks = Array.from(this.#chunks.entries())
          .sort((a, b) => a[0] - b[0])
          .map(([_, v]) => v)
          .join('');
        const {credential, name, birthDate, parsedBirthDate} = decodeQR(
          trustedIssuersJWKS,
          orderedChunks,
        );
        const response: CompleteSHC = {
          type: 'SHC',
          valid: true,
          complete: true,
          credential,
          name,
          birthDate,
          parsedBirthDate,
          multi: {
            chunk: chunk,
            totalChunks: totalChunks,
            chunksScanned: Array.from(this.#chunks.keys()).sort(),
          },
        };
        // Wait to reset until after you build the output due to chunk numbers.
        this.reset();
        return response;
      }
      // We don't have all the chunks, so return incomplete instead...
      const response: PartialSHC = {
        type: 'SHC',
        valid: true,
        complete: false,
        multi: {
          chunk: chunk,
          totalChunks: totalChunks,
          chunksScanned: Array.from(this.#chunks.keys()).sort(),
        },
      };
      return response;
    } catch (e) {
      if (__DEV__) {
        console.debug(e);
      }
      return {
        valid: false,
        thirdParty: input.includes('vaccine-ontario.ca'),
        multi:
          this.#totalChunks !== undefined
            ? {
                totalChunks: this.#totalChunks,
                chunksScanned: Array.from(this.#chunks.keys()).sort(),
              }
            : null,
      };
    }
  }
}
