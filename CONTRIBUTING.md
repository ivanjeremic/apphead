# Contributing to AppHead

If you are able to select themes in you editor of choice we recommend a theme which uses colors that let the Comments appear more in the background which makes the code easier to reasa, since the project uses DTSDoc for typing.

## Repository

-packages/apphead
(main package/core)

-packages/apphead-\*
(all packages prefixed with 'apphead-' are core plugins maintained by the apphead maintainers and people from the community feel free to Contribute.)

-packages/panel
(this is the admin panel which is also a part of core but kept a seperate package in the repo for easier development, when building the panel for production the /dist for gets moved into 'packages/apphead/dist/panel' because the panel is and should be part of core.)

# PUBLISHING TO NPM

AppHead is a modern ESM Application which is easy to understand and contribute to and has no build steps except you are contrubuting to the Panel under the /packages/panel.
When changes are made and merged into the repository all we need to do is update versions of each modified package and publish to npm and do `npm i` and then `npm publish` the new version of "domedb"

# Contribute to SDKs

# General

Every SDK comes with a Local DomeDB Database which makes DomeDB offline first and allows Developers to use DomeDB also for Application which don't need a Hosted Database, so if you are building for example a WIN/MAC/Linux/Android/IOS App which will never need a Hosted Database then the SDK for your Language is all you need to use DomeDB. On the other hand if you build Application which need both it also allows for interaction with the Hosted Database/Clusters and local to cloud data sync that means every write to the database without internet connections will be synced when the connection is back.

# Contribute to node-sdk - /packages/SDKs/node-sdk

The Node & Deno SDKs need to have the exact same codebase except for the module imports and they are published diffrently.

# Contribute to deno-sdk - /packages/SDKs/deno-sdk

This is a deno project and is not tracked by the Workspace feature of npm as you can see under ./package.json.
The Node & Deno SDKs need to have the exact same codebase except for the module imports and they are published diffrently.

# Contribute to web-sdk - /packages/SDKs/web-sdk

This is a deno project and is not tracked by the Workspace feature of npm as you can see under ./package.json.
The Node & Deno SDKs need to have the exact same codebase except for the module imports and they are published diffrently.

# Contribute to Panel - /packages/panel

The DomeDB Panel is a Next.js Application which uses SSR only, since the DomeDB Server is a Backend built on Fastify the way Next.js is integrated is trough a Fastify plugin which uses the Next.js Custom Server, https://nextjs.org/docs/advanced-features/custom-server. The Panel istself is a Fastify plugin aswell which is published to NPM @domedb/panel and used in @domedb/core.

# Contribute to Core

Soon...

# Contribute to Official Plugin - /packages/plugins

Official Plugins are Fastify-plugins which extend the functionality of DomeDB.
