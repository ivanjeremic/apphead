export default async function users(fastify, options) {
  fastify.post("/admin/users/add", async (request, reply) => {
    //
  });

  fastify.get("/admin/users/:page", async (request, reply) => {
    //
  });

  fastify.put("/admin/users/:id", async (request, reply) => {
    //
  });

  fastify.delete("/admin/users/delete/:id", async (request, reply) => {
    //
  });
}
