import { myData } from "@apphead/xstorage";
import { lucia, LuciaError, LuciaErrorConstructor } from "@apphead/auth";

export default eventHandler(() => {
  return myData();
});
