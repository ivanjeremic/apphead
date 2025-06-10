import { issuer } from "@openauthjs/openauth";
import { subjects } from "./subjects";
import { existsSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import {
  joinKey,
  splitKey,
  StorageAdapter,
} from "@openauthjs/openauth/storage/storage";
import { PasswordProvider } from "@openauthjs/openauth/provider/password";
import { PasswordUI } from "@openauthjs/openauth/ui/password";

/**
 * Configure the memory store.
 */
export interface MemoryStorageOptions {
  /**
   * Optionally, backup the store to a file. So it'll be persisted when the issuer restarts.
   *
   * @example
   * ```ts
   * {
   *   persist: "./persist.json"
   * }
   * ```
   */
  persist?: string;
}
export function MemoryStorage(input?: MemoryStorageOptions): StorageAdapter {
  const store = [] as [
    string,
    { value: Record<string, any>; expiry?: number },
  ][];

  if (input?.persist) {
    if (existsSync(input.persist)) {
      const file = readFileSync(input?.persist);
      store.push(...JSON.parse(file.toString()));
    }
  }

  async function save() {
    if (!input?.persist) return;
    const file = JSON.stringify(store);
    await writeFile(input.persist, file);
  }

  function search(key: string) {
    let left = 0;
    let right = store.length - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const comparison = key.localeCompare(store[mid][0]);

      if (comparison === 0) {
        return { found: true, index: mid };
      } else if (comparison < 0) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return { found: false, index: left };
  }
  return {
    async get(key: string[]) {
      const match = search(joinKey(key));
      if (!match.found) return undefined;
      const entry = store[match.index][1];
      if (entry.expiry && Date.now() >= entry.expiry) {
        store.splice(match.index, 1);
        await save();
        return undefined;
      }
      return entry.value;
    },
    async set(key: string[], value: any, expiry?: Date) {
      const joined = joinKey(key);
      const match = search(joined);
      // Handle both Date objects and TTL numbers while maintaining Date type in signature
      const entry = [
        joined,
        {
          value,
          expiry: expiry ? expiry.getTime() : expiry,
        },
      ] as (typeof store)[number];
      if (!match.found) {
        store.splice(match.index, 0, entry);
      } else {
        store[match.index] = entry;
      }
      await save();
    },
    async remove(key: string[]) {
      const joined = joinKey(key);
      const match = search(joined);
      if (match.found) {
        store.splice(match.index, 1);
        await save();
      }
    },
    async *scan(prefix: string[]) {
      const now = Date.now();
      const prefixStr = joinKey(prefix);
      for (const [key, entry] of store) {
        if (!key.startsWith(prefixStr)) continue;
        if (entry.expiry && now >= entry.expiry) continue;
        yield [splitKey(key), entry.value];
      }
    },
  };
}

async function getUser(email: string) {
  // Get user from database and return user ID
  return "123";
}

export default issuer({
  subjects,
  storage: MemoryStorage(),
  providers: {
    password: PasswordProvider(
      PasswordUI({
        copy: {
          error_email_taken: "This email is already taken.",
        },
        sendCode: async (email, code) => {
          console.log(email, code);
        },
      }),
    ),
  },
  success: async (ctx, value) => {
    if (value.provider === "password") {
      return ctx.subject("user", {
        id: await getUser(value.email),
      });
    }
    throw new Error("Invalid provider");
  },
});
