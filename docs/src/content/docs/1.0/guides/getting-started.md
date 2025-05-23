---
title: Lucia documentation
description: A guide in my new Starlight docs site.
slug: 1.0/guides/getting-started
---

Lucia is an auth library for your server that abstracts away the complexity of handling sessions. It works alongside your database to provide an API that's easy to use, understand, and extend. [Get started →](/1.0/getting-started)

* No more endless configuration and callbacks
* Fully typed
* Works in any runtime - Node.js, Bun, Deno, Cloudflare Workers
* Extensive database support out of the box

```ts
import { Lucia } from "lucia";

const lucia = new Lucia(new Adapter(db));

const session = await lucia.createSession(userId, {});
await lucia.validateSession(session.id);
```

Lucia is an open source library released under the MIT license, with the help of [100+ contributors](https://github.com/lucia-auth/lucia/graphs/contributors)! Join us on [Discord](https://discord.com/invite/PwrK3kpVR3) if you have any questions.

> In case you missed the news, we've recently released Lucia 3.0! [Read the announcement](https://github.com/lucia-auth/lucia/discussions/1361).
