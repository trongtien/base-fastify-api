export interface FastifyRequestInterface {
  file: RequestFileInterface;
  files: RequestFileInterface[];
}

export interface RequestFileInterface {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface IValidateHttp {
  field: string;
  code: string;
  message: string;
}

export interface IPaginationQueryParam {
  offset?: number;
  limit?: number;
}

export type SortOrder = 'ASC' | 'DESC';

export interface ISortQueryParam<Sortkey = unknown> {
  sortBy?: Sortkey;
  sortOrder?: SortOrder;
}

export interface ISeachQueryParam {
  search?: string;
}

export enum Block {
  block = 1,
  unBlock = 0,
}

export enum Delete {
  deleted = 1,
  unDeleted = 0,
}
