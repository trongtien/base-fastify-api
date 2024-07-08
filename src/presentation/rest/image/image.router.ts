import { CommonLandSchema } from 'presentation/rest/common-land/common-land.schema';
import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { CommonLandRepository } from 'infrastructure/repositories/common-land.repository';
import { CreateCommonLand } from 'application/use-cases/common-land/create.use-case';
import ImageHandler from './image.controller';
import { uploadFileWithMulter } from 'presentation/middleware/file-upload.middleware';
import ResizeImage from 'infrastructure/helper/resize';

export default class ImageRouter {
  public prefix_route = '/common';

  async routes(app: FastifyInstance, _options: FastifyPluginOptions, _done: any) {
    const commonRepo = new CommonLandRepository(app.db, app.redis, app.log);
    const createCommonLandUseCase = new CreateCommonLand(commonRepo);

    const resizePostEstate = new ResizeImage(app.config.ROOT_PATH_UPLOAD_FILE);

    const handler = new ImageHandler(resizePostEstate);

    app.route({
      method: 'POST',
      url: '/upload-image',
      preHandler: uploadFileWithMulter.single('files'),
      handler: handler.create,
    });
  }
}
