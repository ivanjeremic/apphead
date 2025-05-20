import { Domebase } from "domebase";
import { createDomebaseServer } from "@domebase/plugin-backend";
import driverNode from "@domebase/driver-node";

const API_BASENAME = "/";

export const domebase = new Domebase({
	driver: driverNode({ path: ".datadome" }),
	path: ".domebase",
	plugins: [createDomebaseServer()],
});

const { app } = domebase.plugin.get("my-plugin");

export { app, API_BASENAME };
