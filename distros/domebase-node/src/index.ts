import { Domebase } from "domebase";
//@ts-ignore
import { createDomebaseServer } from "@domebase/plugin-backend";
//@ts-ignore
import driverNode from "@domebase/driver-node";

new Domebase({
  driver: driverNode(),
  plugins: [createDomebaseServer({ mode: "production" })],
});
