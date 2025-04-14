import { DomeDB } from "@domebase/core";

export const domedb = new DomeDB({
  driver: useStorage("db"),
  path: ".domebase",
});
