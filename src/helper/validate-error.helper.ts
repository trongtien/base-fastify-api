import { IValidateHttp } from './../type/common.type';
import { ZodError, ZodIssue } from 'zod';

export class ValidateErrorHelper {
  $issue: ZodIssue[];

  constructor(error: ZodError) {
    this.$issue = error.issues;
  }

  transformValidateHttp(): IValidateHttp[] {
    const $result: IValidateHttp[] = [];

    for (let i = 0; i < this.$issue.length; i++) {
      const hasResultFieldError = $result.some((result) => result.field === this.$issue[i].path?.[0]);
      if (hasResultFieldError) {
        continue;
      }

      $result.push({
        code: this.$issue?.[i]?.code ?? '',
        field: this.$issue?.[i]?.path?.[0]?.toString() ?? '',
        message: this.$issue?.[i]?.message ?? '',
      });
    }

    return $result;
  }
}
