import { Domebase } from "domebase";
import { domebaseServer } from "@domebase/server";
import driverNode from "@domebase/driver-node";

const API_BASENAME = "/";

export const domebase = new Domebase({
	driver: driverNode({ path: ".datadome" }),
	path: ".domebase",
});

const api = domebaseServer(domebase);

export { api, API_BASENAME };
