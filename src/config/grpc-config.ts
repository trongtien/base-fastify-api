import path from 'path';

export const grpcConfigServer = (url: string) => {
  return {
    url: url,
    package: [
      {
        packageName: 'user.service',
        protoPath: path.resolve(process.cwd(), './proto/user.proto'),
      },
    ],
    packageDefinitionOptions: {
      oneofs: true,
      longs: String,
      enums: String,
      defaults: true,
    },
    options: {
      keepaliveTimeMs: 5_000,
    },
  };
};

export const grpcConfigClientServiceUser = (url: string) => {
  return {
    url: url,
    package: [
      {
        packageName: 'user.service',
        protoPath: path.resolve(process.cwd(), './proto/user.proto'),
      },
    ],

    packageDefinitionOptions: {
      oneofs: true,
      longs: String,
      enums: String,
      defaults: true,
    },

    options: {
      keepaliveTimeMs: 5_000,
    },
  };
};
