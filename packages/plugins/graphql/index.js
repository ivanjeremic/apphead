const gql = String.raw;

/**
 * domedb graphql plugin
 *
 * @param {*} db
 * @param {*} _opts
 * @param {*} _next
 */
export default async function (db, _opts, _next) {
  const schema = gql`
    type Query {
      add(x: Int, y: Int): Int
    }
  `;

  const resolvers = {
    Query: {
      add: async (_, { x, y }) => x + y,
    },
  };

  await db.register(import('mercurius'), {
    schema,
    resolvers,
    graphiql: true,
  });
}

//neo4j
//h69s7QlY8v4dMI-Ks2kEOz5nGztE8gWGPgEvLNW-yl8
