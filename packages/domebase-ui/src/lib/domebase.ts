import { Domebase } from "domebase";
import indexedDbDriver from "unstorage/drivers/indexedb";

export const domebase = new Domebase({
  baseURL: "/",
  driver: indexedDbDriver({ base: ".domebase" }),
});
