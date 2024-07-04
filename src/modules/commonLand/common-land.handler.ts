import { FastifyInstance } from 'fastify';
import { CommonLandService } from 'services/common-land.service';
import { Handler } from 'type/handler.type';
import { CreateCommonLandRouteInterface } from 'type/common-land.type';

export default class CommonLandHandler {
  #commonLandService: CommonLandService;

  constructor(private readonly app: FastifyInstance) {
    this.app = app;
    this.#commonLandService = new CommonLandService(this.app);
  }

  public create: Handler<CreateCommonLandRouteInterface> = async (request, reply) => {
    const body = request.body;

    const useCase = await this.#commonLandService.create({
      code: body.code,
      name: body.name,
      provinceCode: body.province_code,
      districtCode: body.district_code,
      wardCode: body.ward_code
    })

    reply.send(useCase);
  };
}
