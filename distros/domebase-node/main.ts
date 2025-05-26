import { Domebase } from "domebase";
import { createDomebaseServer } from "@domebase/plugin-backend";
import driverNode from "@domebase/driver-node";

export const domebase = new Domebase({
	driver: driverNode({ path: ".datadome" }),
	path: ".domebase",
	plugins: [createDomebaseServer()],
});
