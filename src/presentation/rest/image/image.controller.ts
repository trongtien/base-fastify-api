import { FastifyRequest } from 'fastify';
import ResizeImage from 'infrastructure/helper/resize';
import { Handler } from 'infrastructure/interface/error-handler.type';

export default class ImageHandler {
  constructor(private readonly _resize: ResizeImage) {}

  public create: Handler<any> = async (request: FastifyRequest, reply) => {
    this._resize
      .run(request.file.destination + `/${request.file.filename}`, request.file.filename, 'POST_ESTATE')
      
    reply.send(request.file);
  };
}
