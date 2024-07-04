// Original file: proto/user.proto

import type { District as _user_service_District, District__Output as _user_service_District__Output } from '../../user/service/District';

export interface DistrictResponse {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: ({[key: string]: _user_service_District});
  '_error'?: "error";
}

export interface DistrictResponse__Output {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: ({[key: string]: _user_service_District__Output});
}
