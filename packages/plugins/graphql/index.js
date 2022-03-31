/**
 * domedb graphql plugin
 *
 * @param {*} db
 * @param {*} _opts
 * @param {*} _next
 */
export default async function (db, _opts, _next) {
  await db.register(import('mercurius-auto-schema'), {
    definitions: {
      openapi: {
        info: {
          title: 'Test OpenAPI',
          description: 'testing the fastify openapi',
          version: '0.1.0',
        },
      },
      exposeRoute: true,
    },
    graphql: {
      graphiql: true,
    },
  });

  db.put(
    '/some-route/:id',
    {
      schema: {
        description: 'post some data',
        tags: ['user', 'code'],
        summary: 'qwerty',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'user id',
            },
          },
        },
        body: {
          type: 'object',
          properties: {
            hello: { type: 'string' },
            obj: {
              type: 'object',
              properties: {
                some: { type: 'string' },
              },
            },
          },
        },
        response: {
          201: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              hello: { type: 'string' },
            },
          },
        },
      },
    },
    (req, reply) => {
      reply.send({ hello: `Hello ${req.body.hello}` });
    }
  );

  db.get(
    '/user/:id',
    {
      schema: {
        description: 'get a user',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'user id',
            },
          },
        },
        response: {
          201: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              name: { type: 'string' },
              companyId: { type: 'string' },
            },
          },
        },
      },
      links: {
        201: {
          company: {
            operationId: 'getCompany',
            parameters: {
              id: '$request.path.id',
            },
          },
        },
      },
    },
    () => 'hello world'
  );

  db.get(
    '/company/:id',
    {
      schema: {
        operationId: 'getCompany',
        description: 'get a company',
        params: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'company id',
            },
          },
        },
        response: {
          201: {
            description: 'Succesful response',
            type: 'object',
            properties: {
              name: { type: 'string' },
            },
          },
        },
      },
    },
    () => 'hello world'
  );
}
