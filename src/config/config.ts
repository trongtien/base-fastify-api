export const ENV_SCHEMA = {
  type: 'object',
  required: [
    'PORT',
    'JWT_SECRET',
    'COOKIE_SECRET',
    'NODE_ENV',
    'PORT_POSTGRES',
    'USER_POSTGRES',
    'PASSWORD_POSTGRES',
    'DATABASE_POSTGRES',
    'SCHEMA_POSTGRES',
    'HOST_POSTGRES',
    'SYNCHRONIZE_POSTGRES',
    'REDIS_CLIENT',
    'REDIS_PORT',
    'REDIS_USER',
    'REDIS_PASSWORD',
  ],
  properties: {
    PORT: {
      type: 'number',
    },
    GRPC_SERVER: {
      type: 'string',
    },
    GRPC_CLIENT_USER: {
      type: 'string',
    },
    JWT_SECRET: {
      type: 'string',
    },
    COOKIE_SECRET: {
      type: 'string',
    },
    NODE_ENV: {
      type: 'string',
    },
    PORT_POSTGRES: {
      type: 'number',
    },
    USER_POSTGRES: {
      type: 'string',
    },
    PASSWORD_POSTGRES: {
      type: 'string',
    },
    DATABASE_POSTGRES: {
      type: 'string',
    },
    SCHEMA_POSTGRES: {
      type: 'string',
    },
    HOST_POSTGRES: {
      type: 'string',
    },
    SYNCHRONIZE_POSTGRES: {
      type: 'number',
    },
    REDIS_CLIENT: {
      type: 'string',
    },
    REDIS_PORT: {
      type: 'number',
    },
    REDIS_USER: {
      type: 'string',
    },
    REDIS_PASSWORD: {
      type: 'string',
    },
  },
};
