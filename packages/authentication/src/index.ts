export { AuthClient } from "./core.js";
export {
  Scrypt,
  LegacyScrypt,
  generateId,
  generateIdFromEntropySize,
} from "./crypto.js";
export { TimeSpan } from "./date.js";
export { Cookie, CookieAttributes } from "./cookie.js";
export { verifyRequestOrigin } from "./request.js";
export { validateRequest } from "./validateRequest.js";
export * from "arctic";

// remove in future
export { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import sqlite from "better-sqlite3";
export { sqlite };

export type {
  User,
  Session,
  SessionCookieOptions,
  SessionCookieAttributesOptions,
} from "./core.js";
export type {
  DatabaseSession,
  DatabaseUser,
  DatabaseUserGitHub,
  Adapter,
} from "./database.js";

export { AppheadAdapter } from "./database";

export type { PasswordHashingAlgorithm } from "./crypto.js";

import type { AuthClient } from "./core.js";

export interface Register {}

export type UserId = Register extends {
  UserId: infer _UserId;
}
  ? _UserId
  : string;

export type RegisteredLucia = Register extends {
  Lucia: infer _AuthClient;
}
  ? _AuthClient extends AuthClient<any, any>
    ? _AuthClient
    : AuthClient
  : AuthClient;

export type RegisteredDatabaseUserAttributes = Register extends {
  DatabaseUserAttributes: infer _DatabaseUserAttributes;
}
  ? _DatabaseUserAttributes
  : {};

export type RegisteredDatabaseSessionAttributes = Register extends {
  DatabaseSessionAttributes: infer _DatabaseSessionAttributes;
}
  ? _DatabaseSessionAttributes
  : {};
