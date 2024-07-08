// import { App } from './app';

import drizzlePlugin from 'infrastructure/plugins/drizzle.plugin';
import grpcClientUserService from 'infrastructure/plugins/grpc-client-user.plugin';
import redisPlugin from 'infrastructure/plugins/redis.plugin';
import { AppDomainServer } from 'infrastructure/web-server/server';
import CommonLandRouter from 'presentation/rest/common-land/common-land.router';
import ImageRouter from 'presentation/rest/image/image.router';

const bootstraps = async () => {
  const appDomain = new AppDomainServer({
    plugin: [drizzlePlugin, redisPlugin, grpcClientUserService],
    routes: [
      CommonLandRouter,
      ImageRouter
    ],
  });

  const $portRun = process.env.PORT
  if(!$portRun) {
    appDomain.app.log.error('Port server run undefined')
    process.exit(1);
  }

  try {
    await appDomain.listen(parseInt($portRun));
  } catch (err) {
    appDomain.app.log.error(err);

    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

bootstraps();
