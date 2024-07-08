import Fastify from 'fastify';
import type { DoneFuncWithErrOrRes, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as dotenv from 'dotenv';
import fastifyEnv from '@fastify/env';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import pino from 'pino';
import * as queryString from 'query-string-esm';
import { PrettyOptions } from 'pino-pretty';
import { ENVIRONMENT } from 'infrastructure/config/environment';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import errorHandler from './error.handler';
import fastifyMulter from 'fastify-multer'
import cors, { FastifyCorsOptions } from '@fastify/cors';
import onSendHook from 'infrastructure/hooks/on-send.hook';
import onCloseHook from 'infrastructure/hooks/on-close.hook';
import { FastifyRequestInterface } from 'infrastructure/interface/common.type';

declare module 'fastify' {
  interface FastifyRequest extends FastifyRequestInterface{}
  interface FastifyInstance {
    config: {
      PORT: number;
      ROOT_PATH_UPLOAD_FILE: string;
      GRPC_SERVER: string;
      GRPC_CLIENT_USER: string;

      JWT_SECRET: string;
      COOKIE_SECRET: string;
      NODE_ENV: string;
      PORT_POSTGRES: number;
      USER_POSTGRES: string;
      PASSWORD_POSTGRES: string;
      DATABASE_POSTGRES: string;
      SCHEMA_POSTGRES: string;
      HOST_POSTGRES: string;
      SYNCHRONIZE_POSTGRES: number;

      REDIS_CLIENT: string;
      REDIS_PORT: number;
      REDIS_USER: string;
      REDIS_PASSWORD: string;
    };
  }
}

export class AppDomainServer {
  public app: FastifyInstance;

  constructor(appInit: { plugin: any; routes: any }) {
    dotenv.config();

    this.app = Fastify({
      disableRequestLogging: true,
      logger: {
        stream: pino.multistream(this.getLoggerStreams()),
        level: 'info',
      },
      querystringParser: (str: string) => {
        return queryString.parse(str, {
          parseNumbers: true,
        });
      },
    }).withTypeProvider<JsonSchemaToTsProvider>();

    this.init(appInit);

    
  }

  public async listen(port: number): Promise<void> {
    this.app.listen({
      port: port,
    });
  }

  // TODO: Init Application Domain
  private async init(appInit: { plugin: any; routes: any }): Promise<void> {
    this.app.register(fastifyEnv, {
      schema: ENVIRONMENT,
      dotenv: true,
    });

    this.setupCors();
    this.setupHook();
    this.setupZodSchemaValidate()
    
    this.app.register(fastifyMulter.contentParser)

    this.initRegister(appInit.plugin);
    this.initRoutes(appInit.routes);
  }

  private initRegister(plugins: { forEach: (arg0: (plugin: any) => void) => void }): void {
     plugins.forEach((plugin: any): void => {
      this.app.register(plugin);
    });
  }

  private initRoutes(routes: { forEach: (arg0: (routes: any) => void) => void }): void {
    routes.forEach((route: any): void => {
      const router = new route();
      this.app.register(router.routes, { prefix: router.prefix_route });
    });
  }

  // TODO: Config cors application
  private setupCors() {
    this.app.register(cors, {
      credentials: true,
      origin: ['http://localhost:3000'],
    } as FastifyCorsOptions);
  }

  // TODO: Setup hook
  private setupHook(): void {
    this.app.addHook(
      'onSend',
      (request: FastifyRequest, replay: FastifyReply, payload: any, done: DoneFuncWithErrOrRes): void =>
        onSendHook(request, replay, payload, done),
    );

    this.app.addHook('onClose', (instance: FastifyInstance, done: DoneFuncWithErrOrRes): void =>
      onCloseHook(instance, done),
    );
  }

  private setupZodSchemaValidate(): void {
    this.app.withTypeProvider<ZodTypeProvider>();
    this.app.setValidatorCompiler(validatorCompiler);
    this.app.setSerializerCompiler(serializerCompiler);

    this.app.setErrorHandler(errorHandler);
  }

  // TODO: Config logger
  private getLoggerStreams() {
    const pinoTransport = pino.transport<PrettyOptions>({
      target: 'pino-pretty',
      options: {
        colorize: true,
        colorizeObjects: true,
        translateTime: 'SYS:hh:MM:ss TT',
        ignore: 'pid,hostname',
      },
    });

    return [{ level: 'debug', stream: pinoTransport }];
  }
}
