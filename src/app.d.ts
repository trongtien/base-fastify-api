declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
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
