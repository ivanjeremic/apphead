import { DomeDB } from "@domebase/core";
import localStorageDriver from "unstorage/drivers/localstorage";

class DomebaseClient extends DomeDB {
  constructor() {
    super({
      engine: localStorageDriver({ base: "domebase:" }),
      path: ".domebase",
    });
  }
}

const db = new DomebaseClient();

db;
