import { Domebase } from "domebase";
import { createDomebaseServer } from "@domebase/plugin-backend";
import driverNode from "@domebase/driver-node";

new Domebase({
	driver: driverNode({ path: ".datadome" }),
	path: ".domebase",
	plugins: [createDomebaseServer()],
});
