// Original file: proto/user.proto

import type { Province as _user_service_Province, Province__Output as _user_service_Province__Output } from '../../user/service/Province';

export interface ProvinceResponse {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: ({[key: string]: _user_service_Province});
  '_error'?: "error";
}

export interface ProvinceResponse__Output {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: ({[key: string]: _user_service_Province__Output});
}
