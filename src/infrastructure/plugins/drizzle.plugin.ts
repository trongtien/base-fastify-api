import { FastifyInstance, FastifyPluginAsync, HookHandlerDoneFunction } from 'fastify';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fp from 'fastify-plugin';
import { NodeDatabase } from 'type/drizzle.type';
import {
  commonLandModel,
  imageModel,
  postEstateDetailModel,
  postEstateHistoryModel,
  postEstateModel,
  postEstateReportModel,
} from 'domain/entities';

declare module 'fastify' {
  interface FastifyInstance {
    db: NodeDatabase;
  }
}

export const drizzleSchema = {
  imageModel,
  commonLandModel,
  postEstateModel,
  postEstateReportModel,
  postEstateDetailModel,
  postEstateHistoryModel,
};

const drizzlePlugin: FastifyPluginAsync = fp(async (app: FastifyInstance): Promise<void> => {
  try {
    const pool = new Pool({
      connectionString: `postgresql://${app.config.USER_POSTGRES}:${app.config.PASSWORD_POSTGRES}@${app.config.HOST_POSTGRES}:${app.config.PORT_POSTGRES}/${app.config.DATABASE_POSTGRES}?schema=${app.config.SCHEMA_POSTGRES}`,
      ssl: false,
    });

    const drizzleDriver = drizzle(pool, { schema: drizzleSchema });
    await pool.connect();

    app.decorate('db', drizzleDriver);
    // app.addHook('onClose', (app: FastifyInstance, done: HookHandlerDoneFunction): void => {
    //   const db = app?.db as unknown as any;

    //   if (db?.['onClose'] !== undefined) {
    //     db?.onClose();
    //   }
    //   done();
    // });
    app.log.info('Connect database successs');
  } catch (error) {
    app.log.error(`Connect database error ${error}`);
  }
});

export default drizzlePlugin;
