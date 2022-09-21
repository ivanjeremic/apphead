export default async function myPlugin() {
  // do anything

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
        console.log("3000?");
      },
    },
  };
}
