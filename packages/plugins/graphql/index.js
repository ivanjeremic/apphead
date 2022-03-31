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

/**
 *
 * @param {*} db
 * @param {*} opts
 * @param {*} next
 */
export default async function (db, opts, next) {
  await db.register(import('mercurius'), {
    schema,
    resolvers,
    graphiql: true,
    ide: true,
    path: '/graphql',
  });
}
