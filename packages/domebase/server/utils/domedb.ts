import { DomeDB } from "@domebase/core";
import { open } from "lmdb";

function lmdbEngine() {
  return {
    driver: useStorage("db"),
    handleQuery: async (cleanPath: string) => {
      const db = open({
        path: cleanPath,
      });

      const values = db.getRange();

      return values;
    },
  };
}

export const domedb = new DomeDB({
  engine: lmdbEngine(),
  path: ".domebase",
});
