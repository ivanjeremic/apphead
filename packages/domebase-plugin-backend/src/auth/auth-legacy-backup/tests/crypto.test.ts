import { test, expect } from "vitest";
import {
  Scrypt,
  LegacyScrypt,
  generateIdFromEntropySize,
} from "../src/crypto.js";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { scrypt } from "../src/scrypt.js";
import { scryptSync as nodeScrypt } from "node:crypto";

test("scrypt() output matches crypto", async () => {
  const password = "2uY379HYD&@#Uう２雨h";
  const salt = encodeHexLowerCase(crypto.getRandomValues(new Uint8Array(16)));
  const scryptHash = await scrypt(
    new TextEncoder().encode(password),
    new TextEncoder().encode(salt),
    {
      N: 16384,
      r: 16,
      p: 1,
      dkLen: 64,
    },
  );
  const cryptoHash = new Uint8Array(
    nodeScrypt(password, salt, 64, {
      N: 16384,
      p: 1,
      r: 16,
      maxmem: 128 * 16384 * 16 * 2,
    }).buffer,
  );
  expect(cryptoHash).toStrictEqual(scryptHash);
});

test("validateScryptHash() validates hashes generated with generateScryptHash()", async () => {
  const password = encodeHexLowerCase(
    crypto.getRandomValues(new Uint8Array(32)),
  );
  const scrypt = new Scrypt();
  const hash = await scrypt.hash(password);
  await expect(scrypt.verify(hash, password)).resolves.toBe(true);
  const falsePassword = encodeHexLowerCase(
    crypto.getRandomValues(new Uint8Array(32)),
  );
  await expect(scrypt.verify(hash, falsePassword)).resolves.toBe(false);
});

test("LegacyScrypt", async () => {
  const password = encodeHexLowerCase(
    crypto.getRandomValues(new Uint8Array(32)),
  );
  const scrypt = new LegacyScrypt();
  const hash = await scrypt.hash(password);
  await expect(scrypt.verify(hash, password)).resolves.toBe(true);
  const falsePassword = encodeHexLowerCase(
    crypto.getRandomValues(new Uint8Array(32)),
  );
  await expect(scrypt.verify(hash, falsePassword)).resolves.toBe(false);
});

test("generateIdFromEntropySize()", () => {
  // check string is only lowercase
  for (let i = 0; i < 100; i++) {
    const id = generateIdFromEntropySize(10);
    expect(id).not.toMatch(/[A-Z]/);
  }

  // check output length
  const id1 = generateIdFromEntropySize(25);
  expect(id1.length).toBe(40);

  // check padding is omitted
  const id3 = generateIdFromEntropySize(8);
  expect(id3).not.toMatch(/=/);
});
