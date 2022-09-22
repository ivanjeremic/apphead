export default async function apollo() {
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
      async graphql(request, reply) {
        console.log("3000?");
      },
    },
  };
}