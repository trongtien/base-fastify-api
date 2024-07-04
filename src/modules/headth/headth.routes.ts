import { FastifyInstance } from 'fastify';
import { AppAccessDenied, AppBadRequest, AppNotFound, AppServerInternal } from '../../helper/app-exception.helper';

export const HEADTH_ROUTES = async (app: FastifyInstance): Promise<void> => {
  app.route({
    method: 'GET',
    url: '/',
    handler: function () {
      return { data: 'head check null' };
    },
  });

  app.route({
    method: 'GET',
    url: '/error-bad-request',
    handler: function () {
      throw new AppBadRequest('id not found');
    },
  });

  app.route({
    method: 'GET',
    url: '/error-access',
    handler: function () {
      throw new AppAccessDenied();
    },
  });

  app.route({
    method: 'GET',
    url: '/error-server-internal',
    handler: function () {
      throw new AppServerInternal();
    },
  });

  app.route({
    method: 'GET',
    url: '/error-not-found',
    handler: function () {
      throw new AppNotFound();
    },
  });
};
