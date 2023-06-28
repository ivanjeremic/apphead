import {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode,
} from "simple-oauth2";

export default async function myPlugin() {
  return {
    name: "myPLugin",
    version: "0.0.1",
    onInstall() {
      console.info("onInstall");
    },
    onRemove() {
      // do stuff when removing a plugin
    },
    api: {
      async addTodo(request, reply) {
        console.log("Hello PLugin b2200?");
      },
    },
  };
}
