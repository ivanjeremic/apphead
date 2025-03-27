import { DomeDB } from "@domebase/core";
import localStorageDriver from "unstorage/drivers/localstorage";

export class DomebaseClient extends DomeDB {
  constructor() {
    super({
      engine: {
        driver: localStorageDriver({ base: "domebase:" }),
        handleQuery: (cleanPath: string) => {
          return [];
        },
      },
      path: ".domebase",
    });
  }
}
