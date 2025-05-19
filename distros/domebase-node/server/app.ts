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

export const app = express();

app.use("/api", async (req, res, next) => {
	const colls = await domedb.query({ collection: "__collections" });
	res.json(colls);
});
//
app.use(
	createRequestHandler({
		build: () => import("virtual:react-router/server-build"),
		getLoadContext() {
			return {
				VALUE_FROM_EXPRESS: "Hello from Expddress",
			};
		},
	}),
);

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// try starting hono app here
