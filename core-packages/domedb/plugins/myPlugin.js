export default async function myPlugin() {
  // do anything

  return {
    name: "myPLugin",
    version: "0.0.1",
    onInstall() {
      console.info(`successfully installed ${this.name}`);
    },
    onRemove() {
      // do stuff when removing a plugin
    },
    api: {
      v1: {
        async addTodo(request, reply) {
          console.log("Now?");
        },
      },
    },
  };
}
