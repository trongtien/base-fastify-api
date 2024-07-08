import { CommonLandSchema } from 'presentation/rest/common-land/common-land.schema';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { CommonLandRepository } from 'infrastructure/repositories/common-land.repository';
import CommonLandHandler from './common-land.controller';
import { CreateCommonLand } from 'application/use-cases/common-land/create.use-case';

export default class CommonLandRouter {
  public prefix_route = '/common-land';

  async routes(app: FastifyInstance, _options: FastifyPluginOptions, _done: any) {
    const commonRepo = new CommonLandRepository(app.db, app.redis, app.log)
    const createCommonLandUseCase = new CreateCommonLand(commonRepo)
    
    const handler = new CommonLandHandler(createCommonLandUseCase);
    
    app.route({
      method: 'POST',
      url: '/',
      schema: CommonLandSchema.createCommon,
      handler: handler.create,
    });
  }
}
