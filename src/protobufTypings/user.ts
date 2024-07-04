import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UserServiceClient as _user_service_UserServiceClient, UserServiceDefinition as _user_service_UserServiceDefinition } from './user/service/UserService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  user: {
    service: {
      AdminAuthen: MessageTypeDefinition
      AuthenticationAdminInput: MessageTypeDefinition
      AuthenticationAdminInputResponse: MessageTypeDefinition
      AuthenticationInput: MessageTypeDefinition
      AuthenticationInputResponse: MessageTypeDefinition
      District: MessageTypeDefinition
      DistrictQuery: MessageTypeDefinition
      DistrictResponse: MessageTypeDefinition
      Empty: MessageTypeDefinition
      Province: MessageTypeDefinition
      ProvinceQuery: MessageTypeDefinition
      ProvinceResponse: MessageTypeDefinition
      UserAuthen: MessageTypeDefinition
      UserService: SubtypeConstructor<typeof grpc.Client, _user_service_UserServiceClient> & { service: _user_service_UserServiceDefinition }
      Ward: MessageTypeDefinition
      WardQuery: MessageTypeDefinition
      WardResponse: MessageTypeDefinition
    }
  }
}

