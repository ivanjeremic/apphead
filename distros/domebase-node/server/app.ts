import "react-router";
import { createRequestHandler } from "@react-router/express";
import express from "express";
import { Domebase } from "domebase";
import driverNode from "@domebase/driver-node";

declare module "react-router" {
	interface AppLoadContext {
		VALUE_FROM_EXPRESS: string;
	}
}

export const domedb = new Domebase({
	driver: driverNode({ path: ".datadome" }),
	path: ".domebase",
});

const colls = await domedb.query({ collection: "__collections" });

console.log("COLLS", colls.data);

export const app = express();

app.use(
	createRequestHandler({
		build: () => import("virtual:react-router/server-build"),
		getLoadContext() {
			return {
				VALUE_FROM_EXPRESS: "Hello from Express",
			};
		},
	}),
);
