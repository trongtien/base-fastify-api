import { FastifyInstance } from 'fastify';
import CommonLandHandler from 'modules/commonLand/common-land.handler';
import { CommonSchema } from 'modules/commonLand/common-land.schema';

export const COMMON_LAND_ROUTER = async (app: FastifyInstance): Promise<void> => {
  const handler = new CommonLandHandler(app);
  app.route({
    method: 'POST',
    url: '/',
    schema: CommonSchema.createCommon,
    handler: handler.create,
  });
};
