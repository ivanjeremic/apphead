import {
  Adapter,
  InitializeAdapter,
  KeySchema,
  lucia,
  SessionSchema,
  UserSchema,
} from "lucia";

function useStorage(arg: any): any {
  return "";
}

const AppHeadAdapter = (): InitializeAdapter<Adapter> => {
  return (luciaError) => ({
    // UserAdapter
    async getUser(userId: string): Promise<UserSchema | null> {
      return useStorage("users").getItem("foo");
    },
    async setUser(user: UserSchema, key: KeySchema | null): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    async updateUser(
      userId: string,
      partialUser: Partial<UserSchema>
    ): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    async deleteUser(userId: string): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    async getKey(keyId: string): Promise<KeySchema | null> {
      return useStorage("users").getItem("foo");
    },
    async getKeysByUserId(userId: string): Promise<KeySchema[]> {
      return useStorage("users").getItem("foo");
    },
    async setKey(key: KeySchema): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    async updateKey(
      keyId: string,
      partialKey: Partial<KeySchema>
    ): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    async deleteKey(keyId: string): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    async deleteKeysByUserId(userId: string): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    // SessionAdapter
    async getSession(sessionId: string): Promise<SessionSchema | null> {
      return useStorage("users").getItem("foo");
    },
    async getSessionsByUserId(userId: string): Promise<SessionSchema[]> {
      return useStorage("users").getItem("foo");
    },
    async setSession(session: SessionSchema): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    async updateSession(
      sessionId: string,
      partialSession: Partial<SessionSchema>
    ): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    async deleteSession(sessionId: string): Promise<void> {
      return useStorage("users").getItem("foo");
    },
    async deleteSessionsByUserId(userId): Promise<void> {
      return useStorage("users").getItem("foo");
    },
  });
};

export const auth = lucia({
  env: "DEV", // "PROD" if deployed to HTTPS
  adapter: AppHeadAdapter(),
});
