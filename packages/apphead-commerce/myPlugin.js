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

// or

export class MyPlugin {
  name = "myPlugin"
  version = "0.0.1"
  api = {
    async addTodo(request, reply) {
      console.log("Hello PLugin b2200?")
    },
  }

  onInstall() {
    console.info("onInstall")
  }

  onUninstall() {
    console.info("onUninstall")
  }
}
