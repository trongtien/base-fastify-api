import { CreateCommonLand } from 'application/use-cases/common-land/create.use-case';
import { Handler } from 'infrastructure/interface/error-handler.type';
import { CreateCommonLandInterface } from './common-land.type';


export default class CommonLandHandler {
  constructor(private readonly _createCommonLand: CreateCommonLand) {}
  
  public create: Handler<CreateCommonLandInterface> = async (request, reply) => {
    const body = request.body ;

    const useCase = await this._createCommonLand.execute({
      code: body.code,
      name: body.name,
      provinceCode: body.province_code,
      districtCode: body.district_code,
      wardCode: body.ward_code,
    });

    reply.send(useCase);
  };
}
