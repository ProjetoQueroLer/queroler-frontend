/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';

import { webcrypto } from 'crypto';
import { TextDecoder, TextEncoder } from 'node:util';

globalThis.TextEncoder =
  TextEncoder as unknown as typeof globalThis.TextEncoder;
globalThis.TextDecoder =
  TextDecoder as unknown as typeof globalThis.TextDecoder;
if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}

expect.extend({});
