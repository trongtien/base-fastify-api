import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import fp from 'fastify-plugin';
import path from 'path';
import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { ProtoGrpcType } from 'protobufTypings/user';
import { UserServiceClient } from 'protobufTypings/user/service/UserService';

declare module 'fastify' {
  interface FastifyInstance {
    grpcUserClient: UserServiceClient;
  }
}

const grpcClientUserService: FastifyPluginAsync = fp(async (app: FastifyInstance): Promise<void> => {
  try {
    /*
     * Load config grpc with user
     */
    const PROTO_FILE_USER = path.resolve(process.cwd(), './proto/user.proto');
    const packageDef = protoLoader.loadSync(PROTO_FILE_USER);
    const grpcObj = grpc.loadPackageDefinition(packageDef) as unknown as ProtoGrpcType;

    /*
     * Load config grpc with enviroment
     */
    const hasGrpcClientUser = !app.config.GRPC_CLIENT_USER;
    if (hasGrpcClientUser) {
      app.log.error('Env config grpc client user empty or undifined');

      return;
    }

    /*
     * Load and check connect server grpc user
     */
    const client = new grpcObj.user.service.UserService(
      `${app.config.GRPC_CLIENT_USER}`,
      grpc.credentials.createInsecure(),
    );

    const hasGrpcUserClientApp = app.grpcUserClient;
    if (!hasGrpcUserClientApp) {
      app.grpcUserClient = client;
    }

    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 1);
    client.waitForReady(deadline, (error?: Error): void => {
      if (error) {
        app.log.error('Grpc client user falsed to coonnect error', error.stack);

        return;
      }

      client.Healcheck({}, (error: grpc.ServiceError | null, result): void => {
        if (error) {
          app.log.error('Grpc client user healcheck error', error.stack);
          return;
        }

        app.log.info('Grpc client user healcheck success');
      });
    });

    if (app) app.log.info('Load config grpc client user successs');
  } catch (error) {
    app.log.error('Connect grpc client user error', error);
  }
});

export default grpcClientUserService;
