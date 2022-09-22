#!/usr/bin/env node
import { bootstrap } from "../src/bootstrap.js";

const isDev = process.env.NODE_ENV !== "production";

bootstrap({ isDev });
