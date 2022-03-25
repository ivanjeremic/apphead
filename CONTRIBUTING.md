## PUBLISHING TO NPM

DomeDB is a modern ESM Application which is easy to understand and contribute to and has no build steps except you are contrubuting to the Dashboard under the package "panel",
When changes are made and merged into the repository all we need to do is update versions of each modified package and publish to npm and do `npm i` and then `npm publish` the new version of "domedb"


## Contribute to SDKs

# General
Every SDK comes with a Local DomeDB Database which makes DomeDB offline first and allows Developers to use DomeDB also for Application which don't need a Hosted Database, so if you are building for example a WIN/MAC/Linux/Android/IOS App which will never need a Hosted Database then the SDK for your Language is all you need to use DomeDB. On the other hand if you build Application which need both it also allows for interaction with the Hosted Database/Clusters and local to cloud data sync that means every write to the database without internet connections will be synced when the connection is back.

# node-sdk
The Node & Deno SDKs need to have the exact same codebase except for the module imports and they are published diffrently.

# deno-sdk
This is a deno project and is not tracked by the Workspace feature of npm as you can see under ./package.json.
The Node & Deno SDKs need to have the exact same codebase except for the module imports and they are published diffrently.

# web-sdk
This is a deno project and is not tracked by the Workspace feature of npm as you can see under ./package.json.
The Node & Deno SDKs need to have the exact same codebase except for the module imports and they are published diffrently.

