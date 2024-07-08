// Original file: proto/user.proto

import type { UserAuthen as _user_service_UserAuthen, UserAuthen__Output as _user_service_UserAuthen__Output } from '../../user/service/UserAuthen';

export interface AuthenticationInputResponse {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: (_user_service_UserAuthen | null);
  '_error'?: "error";
  '_data'?: "data";
}

export interface AuthenticationInputResponse__Output {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: (_user_service_UserAuthen__Output);
}
