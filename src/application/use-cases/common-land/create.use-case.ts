import { ConvertString } from 'infrastructure/helper/convert-string';
import { CommonLandModelRead, CommonLandModelWrite } from 'infrastructure/interface/common-land.type';
import { IValidateHttp } from 'infrastructure/interface/common.type';
import { CommonLandRepository } from 'infrastructure/repositories/common-land.repository';
import { ValidateError } from 'infrastructure/web-server/exception.handler';
import { UseCase } from 'infrastructure/web-server/use-case.handler';

export type CreateCommonLandInputDTO = {
  name: string;
  code: string;
  provinceCode: number;
  districtCode: number;
  wardCode: number;
};

export type CreateCommonLandOutputDTO = CommonLandModelRead;

export class CreateCommonLand implements UseCase<CreateCommonLandInputDTO, CreateCommonLandOutputDTO> {
  constructor(private readonly _commonLandRepo: CommonLandRepository) {}

  async execute(input: CreateCommonLandInputDTO): Promise<CreateCommonLandOutputDTO> {
    try {
      const $slug = ConvertString.convertStringToSlug({ text: input.name });

      const validateError = await this.validate(input.name, input.code);
      const hasValidError = validateError.length > 0;
      if (hasValidError) {
        throw new ValidateError(validateError);
      }

      const $commonLandInsert: CommonLandModelWrite = {
        code: input.code,
        name: input.name,
        provinceCode: input.provinceCode,
        districtCode: input.districtCode,
        wardCode: input.wardCode,
        slug: $slug,
      };

      const $result = await this._commonLandRepo.insert<CommonLandModelRead>($commonLandInsert);

      this._commonLandRepo.clearAllCacheCreate(input.name, input.code);

      return $result;
    } catch (error) {
      throw error;
    }
  }

  protected async validate(name: string, code: string): Promise<IValidateHttp[]> {
    const $validateError: IValidateHttp[] = [];

    const [$queryWithName, $queryWithCode] = (await Promise.allSettled([
      await this._commonLandRepo.getWithFieldName(name),
      await this._commonLandRepo.getWithFieldCode(code),
    ])) as unknown as { status: string; value?: any }[];

    if ($queryWithName?.value !== null) {
      $validateError.push({
        code: 'INVALID',
        field: 'name',
        message: 'Invalid name',
      });
    }

    if ($queryWithCode?.value !== null) {
      $validateError.push({
        code: 'INVALID',
        field: 'code',
        message: 'Invalid code',
      });
    }

    return $validateError;
  }
}
