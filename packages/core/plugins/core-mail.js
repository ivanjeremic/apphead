/**
 * core-plugin-mail
 *
 * @param {*} db
 * @param {*} opts
 * @param {*} next
 */
export default async function (db, opts, next) {
  await db.register(import('fastify-mailer'), {
    defaults: {
      // set the default sender email address to jane.doe@example.tld
      from: 'Jane Doe <jane.doe@example.tld>',
      // set the default email subject to 'default example'
      subject: 'default example',
    },
    transport: {
      host: 'smtp.example.tld',
      port: 465,
      secure: true, // use TLS
      auth: {
        user: 'jane.doe',
        pass: 'super strong password',
      },
    },
  });
}