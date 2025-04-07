import path from "node:path";
import { broadcastDevReady } from "@remix-run/node";
import { createRequestHandler } from "@remix-run/express";
import express from "express";

const BUILD_DIR = path.resolve(__dirname, "build");
const build = require(BUILD_DIR);

const app = express();

// ... code for setting up your express app goes here ...

export default defineEventHandler(async (event) => {
	app.all("*", createRequestHandler({ build }));

	if (process.env.NODE_ENV === "development") {
		broadcastDevReady(build);
	}
	return;
});
