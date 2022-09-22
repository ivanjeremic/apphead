export default async function (db, _opts, _next) {
  const schema = `
    type Query {
      add(x: Int, y: Int): Int
    }
  `;

  const resolvers = {
    Query: {
      add: async (_, { x, y }) => x + y,
    },
  };

  await db.register(import("mercurius"), {
    schema,
    resolvers,
    graphiql: true,
  });
}
