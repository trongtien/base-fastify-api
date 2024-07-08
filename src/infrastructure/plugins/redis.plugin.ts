import { FastifyInstance, FastifyPluginAsync, HookHandlerDoneFunction } from 'fastify';
import fp from 'fastify-plugin';
import IoRedis from 'ioredis';

declare module 'fastify' {
  interface FastifyInstance {
    redis: IoRedis;
  }
}

const redisPlugin: FastifyPluginAsync = fp(async (app: FastifyInstance): Promise<void> => {
  try {
    const clientRedis = new IoRedis({
      host: app.config.REDIS_CLIENT,
      port: app.config.REDIS_PORT,
      username: app.config.REDIS_USER,
      password: app.config.REDIS_PASSWORD,
    });

    app.decorate('redis', clientRedis);

    app.addHook('onClose', (app: FastifyInstance, done: HookHandlerDoneFunction): void => {
      if (app?.redis !== undefined) {
        app.redis?.disconnect();
      }

      done();
    });

    app.log.info('Connect redis success');
  } catch (error) {
    app.log.error(`Connect redis error ${error}`);
  }
});

export default redisPlugin;
