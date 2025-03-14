---
title: Lucia documentation
description: A guide in my new Starlight docs site.
slug: lucia/guides/getting-started
---

Lucia is an auth library for your server that abstracts away the complexity of handling sessions. It works alongside your database to provide an API that's easy to use, understand, and extend. [Get started →](/lucia/getting-started)

- No more endless configuration and callbacks
- Fully typed
- Works in any runtime - Node.js, Bun, Deno, Cloudflare Workers
- Extensive database support out of the box

```ts
import { Lucia } from "lucia";

const lucia = new Lucia(new Adapter(db));

const session = await lucia.createSession(userId, {});
await lucia.validateSession(session.id);
```

Lucia is an open source library released under the MIT license, with the help of [100+ contributors](https://github.com/lucia-auth/lucia/graphs/contributors)! Join us on [Discord](https://discord.com/invite/PwrK3kpVR3) if you have any questions.

> In case you missed the news, we've recently released Lucia 3.0! [Read the announcement](https://github.com/lucia-auth/lucia/discussions/1361).

# Getting started

A framework-specific guide is also available for:

- [Astro](/getting-started/astro)
- [Next.js App router](/getting-started/nextjs-app)
- [Next.js Pages router](/getting-started/nextjs-pages)
- [Nuxt](/getting-started/nuxt)
- [SolidStart](/getting-started/solidstart)
- [SvelteKit](/getting-started/sveltekit)

Example projects for Astro, Express, Hono, Next.js App Router, Next.js Pages Router, Nuxt, and SvelteKit are available in the [example repository](https://github.com/lucia-auth/examples).

## Installation

Install Lucia using your package manager of your choice.

```
npm install lucia
```

## Initialize Lucia

Import `Lucia` and initialize it with your adapter. Refer to the [Database](/database) page to learn how to set up your database and initialize the adapter. Make sure you configure the `sessionCookie` option and register your `Lucia` instance type.

```ts
import { Lucia } from "lucia";

const adapter = new BetterSQLite3Adapter(db); // your adapter

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production",
    },
  },
});

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}
```

## Polyfill

If you're using Node.js 18 or below, you'll need to polyfill the Web Crypto API. This is not required in Node.js 20, CloudFlare Workers, Deno, Bun, and Vercel Edge Functions. This can be done either by importing `webcrypto`, or by enabling an experimental flag.

```ts
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto as Crypto;
```

```
node --experimental-web-crypto index.js
```

## The Copenhagen Book

This documentation often references [the Copenhagen Book](https://thecopenhagenbook.com). This is an open-source guide on implementing auth and should come in handy when implementing anything auth, including passkeys, multi-factor authentication, and a bit of cryptography. We recommend reading it to learn more about auth in web applications.
