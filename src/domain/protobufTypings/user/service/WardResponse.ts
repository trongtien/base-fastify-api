// Original file: proto/user.proto

import type { Ward as _user_service_Ward, Ward__Output as _user_service_Ward__Output } from '../../user/service/Ward';

export interface WardResponse {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: ({[key: string]: _user_service_Ward});
  '_error'?: "error";
}

export interface WardResponse__Output {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: ({[key: string]: _user_service_Ward__Output});
}
