import { DomeCore } from "@domebase/core";

export const domedb = new DomeCore({
  driver: useStorage("db"),
  path: ".domebase",
});
