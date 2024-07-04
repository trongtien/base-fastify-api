import Fastify from 'fastify';
import type { DoneFuncWithErrOrRes, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import * as dotenv from 'dotenv';
import fastifyEnv from '@fastify/env';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import type { FastifyCorsOptions } from '@fastify/cors';
import type { FastifyCookieOptions } from '@fastify/cookie';
import pino from 'pino';
import * as queryString from 'query-string-esm';
import { PrettyOptions } from 'pino-pretty';
import { HEADTH_ROUTES } from './modules/headth/headth.routes';
import { ENV_SCHEMA } from './config/config';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import errorHandler from './helper/error-handler.helper';
import onSendHook from './hooks/on-send.hook';
import redisPlugin from './plugins/redis.plugin';
import drizzlePlugin from './plugins/drizzle.plugin';
import grpcClientUserService from 'plugins/grpc-client-user.plugin';
import onCloseHook from 'hooks/on-close.hook';
import { COMMON_LAND_ROUTER } from 'modules/commonLand/common-land.router';

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      PORT: number;

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

export class App {
  public app: FastifyInstance;

  constructor() {
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
  }

  async start(): Promise<FastifyInstance> {
    await this.init();
    await this.app.listen({ port: this.app.config.PORT });

    this.app.log.info('Server start running');
    return this.app;
  }

  private async init(): Promise<void> {
    await this.setupEnvConfig();

    this.setupCors();
    this.setupCookie();
    this.setupHook();

    this.acceptPlugin();
    this.setupZodSchemaValidate();

    await this.registerRouter();
  }

  /*
   * TODO: Load schema environment
   */
  private async setupEnvConfig(): Promise<void> {
    await this.app.register(fastifyEnv, {
      schema: ENV_SCHEMA,
      dotenv: true,
    });
  }

  /*
   * TODO: Config cors application
   */
  private setupCors() {
    this.app.register(cors, {
      credentials: true,
      origin: ['http://localhost:3000'],
    } as FastifyCorsOptions);
  }

  /*
   * TODO: Config cookie application
   */
  private setupCookie() {
    this.app.register(cookie, {
      hook: 'preHandler',
      secret: this.app.config.COOKIE_SECRET,
      algorithm: 'sha256',
      parseOptions: {
        path: '/',
        signed: true,
        sameSite: 'strict',
        secure: this.app.config.NODE_ENV === 'production',
        httpOnly: this.app.config.NODE_ENV === 'production',
      },
    } as FastifyCookieOptions);
  }

  /*
   * TODO: Apply plugin auto load
   */
  private acceptPlugin(): void {
    this.app.register(drizzlePlugin);
    this.app.register(redisPlugin);

    /*
     * Init server grpc client
     */
    this.app.register(grpcClientUserService);
  }

  /*
   * TODO: Setup hook
   */
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

  /*
   * TODO: Config logger
   */
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

  /*
   * TODO: Init router application
   */
  private async registerRouter(): Promise<void> {
    this.app.register(HEADTH_ROUTES, { prefix: '/' });
    this.app.register(COMMON_LAND_ROUTER, { prefix: '/common-land' });
  }
}
