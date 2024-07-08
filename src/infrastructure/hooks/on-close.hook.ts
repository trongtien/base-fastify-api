import type { DoneFuncWithErrOrRes, FastifyInstance } from 'fastify';

const onCloseHook = (app: FastifyInstance, done: DoneFuncWithErrOrRes): void => {
  try {
    const appDb = app?.db as unknown as any;
    const sessionDatabase = appDb?.session?.client;
    if (sessionDatabase && typeof sessionDatabase?.end === 'function') {
      sessionDatabase.end();
      app.log.info('Database disconnect');
    }

    done();
  } catch (error) {
    app.log.error(`Application on close hook error ${error} `);
  }
};

export default onCloseHook;
