// Original file: proto/user.proto

import type { AdminAuthen as _user_service_AdminAuthen, AdminAuthen__Output as _user_service_AdminAuthen__Output } from '../../user/service/AdminAuthen';

export interface AuthenticationAdminInputResponse {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: (_user_service_AdminAuthen | null);
  '_error'?: "error";
  '_data'?: "data";
}

export interface AuthenticationAdminInputResponse__Output {
  'status'?: (boolean);
  'error'?: (string);
  'data'?: (_user_service_AdminAuthen__Output);
}
