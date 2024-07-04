// Original file: proto/user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { AuthenticationAdminInput as _user_service_AuthenticationAdminInput, AuthenticationAdminInput__Output as _user_service_AuthenticationAdminInput__Output } from '../../user/service/AuthenticationAdminInput';
import type { AuthenticationAdminInputResponse as _user_service_AuthenticationAdminInputResponse, AuthenticationAdminInputResponse__Output as _user_service_AuthenticationAdminInputResponse__Output } from '../../user/service/AuthenticationAdminInputResponse';
import type { AuthenticationInput as _user_service_AuthenticationInput, AuthenticationInput__Output as _user_service_AuthenticationInput__Output } from '../../user/service/AuthenticationInput';
import type { AuthenticationInputResponse as _user_service_AuthenticationInputResponse, AuthenticationInputResponse__Output as _user_service_AuthenticationInputResponse__Output } from '../../user/service/AuthenticationInputResponse';
import type { DistrictQuery as _user_service_DistrictQuery, DistrictQuery__Output as _user_service_DistrictQuery__Output } from '../../user/service/DistrictQuery';
import type { DistrictResponse as _user_service_DistrictResponse, DistrictResponse__Output as _user_service_DistrictResponse__Output } from '../../user/service/DistrictResponse';
import type { Empty as _user_service_Empty, Empty__Output as _user_service_Empty__Output } from '../../user/service/Empty';
import type { ProvinceQuery as _user_service_ProvinceQuery, ProvinceQuery__Output as _user_service_ProvinceQuery__Output } from '../../user/service/ProvinceQuery';
import type { ProvinceResponse as _user_service_ProvinceResponse, ProvinceResponse__Output as _user_service_ProvinceResponse__Output } from '../../user/service/ProvinceResponse';
import type { WardQuery as _user_service_WardQuery, WardQuery__Output as _user_service_WardQuery__Output } from '../../user/service/WardQuery';
import type { WardResponse as _user_service_WardResponse, WardResponse__Output as _user_service_WardResponse__Output } from '../../user/service/WardResponse';

export interface UserServiceClient extends grpc.Client {
  AdminAuthentication(argument: _user_service_AuthenticationAdminInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_AuthenticationAdminInputResponse__Output>): grpc.ClientUnaryCall;
  AdminAuthentication(argument: _user_service_AuthenticationAdminInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_AuthenticationAdminInputResponse__Output>): grpc.ClientUnaryCall;
  AdminAuthentication(argument: _user_service_AuthenticationAdminInput, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_AuthenticationAdminInputResponse__Output>): grpc.ClientUnaryCall;
  AdminAuthentication(argument: _user_service_AuthenticationAdminInput, callback: grpc.requestCallback<_user_service_AuthenticationAdminInputResponse__Output>): grpc.ClientUnaryCall;
  adminAuthentication(argument: _user_service_AuthenticationAdminInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_AuthenticationAdminInputResponse__Output>): grpc.ClientUnaryCall;
  adminAuthentication(argument: _user_service_AuthenticationAdminInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_AuthenticationAdminInputResponse__Output>): grpc.ClientUnaryCall;
  adminAuthentication(argument: _user_service_AuthenticationAdminInput, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_AuthenticationAdminInputResponse__Output>): grpc.ClientUnaryCall;
  adminAuthentication(argument: _user_service_AuthenticationAdminInput, callback: grpc.requestCallback<_user_service_AuthenticationAdminInputResponse__Output>): grpc.ClientUnaryCall;
  
  CustomerAuthentication(argument: _user_service_AuthenticationInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_AuthenticationInputResponse__Output>): grpc.ClientUnaryCall;
  CustomerAuthentication(argument: _user_service_AuthenticationInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_AuthenticationInputResponse__Output>): grpc.ClientUnaryCall;
  CustomerAuthentication(argument: _user_service_AuthenticationInput, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_AuthenticationInputResponse__Output>): grpc.ClientUnaryCall;
  CustomerAuthentication(argument: _user_service_AuthenticationInput, callback: grpc.requestCallback<_user_service_AuthenticationInputResponse__Output>): grpc.ClientUnaryCall;
  customerAuthentication(argument: _user_service_AuthenticationInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_AuthenticationInputResponse__Output>): grpc.ClientUnaryCall;
  customerAuthentication(argument: _user_service_AuthenticationInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_AuthenticationInputResponse__Output>): grpc.ClientUnaryCall;
  customerAuthentication(argument: _user_service_AuthenticationInput, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_AuthenticationInputResponse__Output>): grpc.ClientUnaryCall;
  customerAuthentication(argument: _user_service_AuthenticationInput, callback: grpc.requestCallback<_user_service_AuthenticationInputResponse__Output>): grpc.ClientUnaryCall;
  
  FindDistrictByCode(argument: _user_service_DistrictQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_DistrictResponse__Output>): grpc.ClientUnaryCall;
  FindDistrictByCode(argument: _user_service_DistrictQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_DistrictResponse__Output>): grpc.ClientUnaryCall;
  FindDistrictByCode(argument: _user_service_DistrictQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_DistrictResponse__Output>): grpc.ClientUnaryCall;
  FindDistrictByCode(argument: _user_service_DistrictQuery, callback: grpc.requestCallback<_user_service_DistrictResponse__Output>): grpc.ClientUnaryCall;
  findDistrictByCode(argument: _user_service_DistrictQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_DistrictResponse__Output>): grpc.ClientUnaryCall;
  findDistrictByCode(argument: _user_service_DistrictQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_DistrictResponse__Output>): grpc.ClientUnaryCall;
  findDistrictByCode(argument: _user_service_DistrictQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_DistrictResponse__Output>): grpc.ClientUnaryCall;
  findDistrictByCode(argument: _user_service_DistrictQuery, callback: grpc.requestCallback<_user_service_DistrictResponse__Output>): grpc.ClientUnaryCall;
  
  FindProvinceByCode(argument: _user_service_ProvinceQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_ProvinceResponse__Output>): grpc.ClientUnaryCall;
  FindProvinceByCode(argument: _user_service_ProvinceQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_ProvinceResponse__Output>): grpc.ClientUnaryCall;
  FindProvinceByCode(argument: _user_service_ProvinceQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_ProvinceResponse__Output>): grpc.ClientUnaryCall;
  FindProvinceByCode(argument: _user_service_ProvinceQuery, callback: grpc.requestCallback<_user_service_ProvinceResponse__Output>): grpc.ClientUnaryCall;
  findProvinceByCode(argument: _user_service_ProvinceQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_ProvinceResponse__Output>): grpc.ClientUnaryCall;
  findProvinceByCode(argument: _user_service_ProvinceQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_ProvinceResponse__Output>): grpc.ClientUnaryCall;
  findProvinceByCode(argument: _user_service_ProvinceQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_ProvinceResponse__Output>): grpc.ClientUnaryCall;
  findProvinceByCode(argument: _user_service_ProvinceQuery, callback: grpc.requestCallback<_user_service_ProvinceResponse__Output>): grpc.ClientUnaryCall;
  
  FindWardByCode(argument: _user_service_WardQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_WardResponse__Output>): grpc.ClientUnaryCall;
  FindWardByCode(argument: _user_service_WardQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_WardResponse__Output>): grpc.ClientUnaryCall;
  FindWardByCode(argument: _user_service_WardQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_WardResponse__Output>): grpc.ClientUnaryCall;
  FindWardByCode(argument: _user_service_WardQuery, callback: grpc.requestCallback<_user_service_WardResponse__Output>): grpc.ClientUnaryCall;
  findWardByCode(argument: _user_service_WardQuery, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_WardResponse__Output>): grpc.ClientUnaryCall;
  findWardByCode(argument: _user_service_WardQuery, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_WardResponse__Output>): grpc.ClientUnaryCall;
  findWardByCode(argument: _user_service_WardQuery, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_WardResponse__Output>): grpc.ClientUnaryCall;
  findWardByCode(argument: _user_service_WardQuery, callback: grpc.requestCallback<_user_service_WardResponse__Output>): grpc.ClientUnaryCall;
  
  Healcheck(argument: _user_service_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_Empty__Output>): grpc.ClientUnaryCall;
  Healcheck(argument: _user_service_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_Empty__Output>): grpc.ClientUnaryCall;
  Healcheck(argument: _user_service_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_Empty__Output>): grpc.ClientUnaryCall;
  Healcheck(argument: _user_service_Empty, callback: grpc.requestCallback<_user_service_Empty__Output>): grpc.ClientUnaryCall;
  healcheck(argument: _user_service_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_Empty__Output>): grpc.ClientUnaryCall;
  healcheck(argument: _user_service_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_service_Empty__Output>): grpc.ClientUnaryCall;
  healcheck(argument: _user_service_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_service_Empty__Output>): grpc.ClientUnaryCall;
  healcheck(argument: _user_service_Empty, callback: grpc.requestCallback<_user_service_Empty__Output>): grpc.ClientUnaryCall;
  
}

export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  AdminAuthentication: grpc.handleUnaryCall<_user_service_AuthenticationAdminInput__Output, _user_service_AuthenticationAdminInputResponse>;
  
  CustomerAuthentication: grpc.handleUnaryCall<_user_service_AuthenticationInput__Output, _user_service_AuthenticationInputResponse>;
  
  FindDistrictByCode: grpc.handleUnaryCall<_user_service_DistrictQuery__Output, _user_service_DistrictResponse>;
  
  FindProvinceByCode: grpc.handleUnaryCall<_user_service_ProvinceQuery__Output, _user_service_ProvinceResponse>;
  
  FindWardByCode: grpc.handleUnaryCall<_user_service_WardQuery__Output, _user_service_WardResponse>;
  
  Healcheck: grpc.handleUnaryCall<_user_service_Empty__Output, _user_service_Empty>;
  
}

export interface UserServiceDefinition extends grpc.ServiceDefinition {
  AdminAuthentication: MethodDefinition<_user_service_AuthenticationAdminInput, _user_service_AuthenticationAdminInputResponse, _user_service_AuthenticationAdminInput__Output, _user_service_AuthenticationAdminInputResponse__Output>
  CustomerAuthentication: MethodDefinition<_user_service_AuthenticationInput, _user_service_AuthenticationInputResponse, _user_service_AuthenticationInput__Output, _user_service_AuthenticationInputResponse__Output>
  FindDistrictByCode: MethodDefinition<_user_service_DistrictQuery, _user_service_DistrictResponse, _user_service_DistrictQuery__Output, _user_service_DistrictResponse__Output>
  FindProvinceByCode: MethodDefinition<_user_service_ProvinceQuery, _user_service_ProvinceResponse, _user_service_ProvinceQuery__Output, _user_service_ProvinceResponse__Output>
  FindWardByCode: MethodDefinition<_user_service_WardQuery, _user_service_WardResponse, _user_service_WardQuery__Output, _user_service_WardResponse__Output>
  Healcheck: MethodDefinition<_user_service_Empty, _user_service_Empty, _user_service_Empty__Output, _user_service_Empty__Output>
}
