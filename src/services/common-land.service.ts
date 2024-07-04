import { FastifyInstance } from 'fastify';
import { ConvertString } from 'helper/convert-string';
import { commonLandModel } from 'models';
import { CommonLandModelWrite, CreateCommonLandInterface } from 'type/common-land.type';
import { BaseRepository } from 'helper/base-repositories';
import { IValidateHttp } from 'type/common.type';
import { ValidateError } from 'helper/app-exception.helper';

export class CommonLandService extends BaseRepository {
  constructor(protected readonly app: FastifyInstance) {
    super(app.db);
  }

  public async create(obj: CreateCommonLandInterface) {
    try {
      const $slug = ConvertString.convertStringToSlug({ text: obj.name });

      const validateError = await this.validate(obj.name, obj.code);
      const hasValidError = validateError.length > 0;
      if (hasValidError) {
        throw new ValidateError(validateError);
      }

      const $commonLandInsert: CommonLandModelWrite = {
        code: obj.code,
        name: obj.name,
        provinceCode: obj.provinceCode,
        districtCode: obj.districtCode,
        wardCode: obj.wardCode,
        slug: $slug,
      };

      const $result = await this.insert(commonLandModel, $commonLandInsert);

      return $result;
    } catch (error) {
      throw error;
    }
  }

  public async delete(id: string) {}

  protected async validate(name: string, code: string): Promise<IValidateHttp[]> {
    const $validateError: IValidateHttp[] = [];

    const [$queryWithName, $queryWithCode] = await Promise.allSettled([
      await this.findByKey(commonLandModel, { name: name }),
      await this.findByKey(commonLandModel, { code: code }),
    ]);

    if ($queryWithName !== null) {
      $validateError.push({
        code: 'INVALID',
        field: 'name',
        message: 'Invalid name',
      });
    }

    if ($queryWithCode !== null) {
      $validateError.push({
        code: 'INVALID',
        field: 'code',
        message: 'Invalid code',
      });
    }

   
    return $validateError
  }
}
