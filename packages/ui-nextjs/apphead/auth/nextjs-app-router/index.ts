import {
  Adapter,
  InitializeAdapter,
  KeySchema,
  SessionSchema,
  UserSchema,
  lucia,
} from "lucia";
import { nextjs_future } from "lucia/middleware";
import { unstorage } from "@lucia-auth/adapter-session-unstorage";
import { github } from "@lucia-auth/oauth/providers";
import { createStorage } from "unstorage";
import { client } from "../../AppHeadClient";
import { cache } from "react";
import * as context from "next/headers";

const storage = createStorage();

/**
 * @description AppHead Adapter
 */
const AppHeadAdapter = (): InitializeAdapter<Adapter> => {
  return (luciaError) => ({
    // UserAdapter
    async getUser(userId: string): Promise<UserSchema | null> {
      return client.find({collection:""});
    },
    async setUser(user: UserSchema, key: KeySchema | null): Promise<void> {
      return client.find({collection:""});
    },
    async updateUser(
      userId: string,
      partialUser: Partial<UserSchema>
    ): Promise<void> {
      return client.find({collection:""});
    },
    async deleteUser(userId: string): Promise<void> {
      return client.find({collection:""});
    },
    async getKey(keyId: string): Promise<KeySchema | null> {
      return client.find({collection:""});
    },
    async getKeysByUserId(userId: string): Promise<KeySchema[]> {
      return client.find({collection:""});
    },
    async setKey(key: KeySchema): Promise<void> {
      return client.find({collection:""});
    },
    async updateKey(
      keyId: string,
      partialKey: Partial<KeySchema>
    ): Promise<void> {
      return client.find({collection:""});
    },
    async deleteKey(keyId: string): Promise<void> {
      return client.find({collection:""});
    },
    async deleteKeysByUserId(userId: string): Promise<void> {
      return client.find({collection:""});
    },
    // SessionAdapter
    async getSession(sessionId: string): Promise<SessionSchema | null> {
      return client.find({collection:""});
    },
    async getSessionsByUserId(userId: string): Promise<SessionSchema[]> {
      return client.find({collection:""});
    },
    async setSession(session: SessionSchema): Promise<void> {
      return client.find({collection:""});
    },
    async updateSession(
      sessionId: string,
      partialSession: Partial<SessionSchema>
    ): Promise<void> {
      return client.find({collection:""});
    },
    async deleteSession(sessionId: string): Promise<void> {
      return client.find({collection:""});
    },
    async deleteSessionsByUserId(userId): Promise<void> {
      return client.find({collection:""});
    },
  });
};

/**
 * @description Lucia
 */
export const auth = lucia({
  env: process.env.NODE_ENV === "development" ? "DEV" : "PROD",
  middleware: nextjs_future(),
  sessionCookie: {
    expires: false,
  },
  adapter: {
    user: AppHeadAdapter(),
    session: unstorage(storage),
  },
});

/**
 * @description GitHub Auth
 */
export const githubAuth = github(auth, {
  clientId: process.env.GITHUB_CLIENT_ID ?? "",
  clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
});

/**
 * @description getPageSession
 */
export const getPageSession = cache(() => {
  const authRequest = auth.handleRequest("GET", context);
  return authRequest.validate();
});

export type Auth = typeof auth;
