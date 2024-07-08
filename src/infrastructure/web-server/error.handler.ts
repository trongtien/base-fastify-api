import { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { TResponseBase } from 'infrastructure/interface/error-handler.type';
import { CONFIG_MESSAGE } from 'infrastructure/config/message';
import { CONFIG_STATUS_HTTP } from 'infrastructure/config/status-reponse';
import { ValidateErrorHelper } from './validate-error.handler';
import { AppAccessDenied, AppBadRequest, AppNotFound, ValidateError } from './exception.handler';

const errorHandler: FastifyInstance['errorHandler'] = function (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): void {
  reply.log.error({
    request: {
      method: request.method,
      url: request.url,
      headers: request.headers,
      body: request.body,
      query: request.query,
      params: request.params,
    },
    error,
  });

  if (error instanceof ValidateError) {
    console.log('error', JSON.stringify(error));
    reply.code(CONFIG_STATUS_HTTP.SUCCESS).send({
      message: CONFIG_MESSAGE.BAD_REQUEST,
      http_status: CONFIG_STATUS_HTTP.BAD_REQUEST,
      error: error.stack as unknown,
      data: null,
    } as TResponseBase);
    return;
  }

  if (error instanceof ZodError) {
    reply.code(CONFIG_STATUS_HTTP.SUCCESS).send({
      message: CONFIG_MESSAGE.BAD_REQUEST,
      http_status: CONFIG_STATUS_HTTP.BAD_REQUEST,
      error: new ValidateErrorHelper(error).transformValidateHttp(),
      data: null,
    } as TResponseBase);
    return;
  }

  if (error instanceof AppNotFound) {
    reply.code(CONFIG_STATUS_HTTP.SUCCESS).send({
      message: CONFIG_MESSAGE.NOT_FOUND,
      http_status: CONFIG_STATUS_HTTP.NOT_FOUND,
      error: [],
      data: null,
    } as TResponseBase);

    return;
  }

  if (error instanceof AppBadRequest) {
    reply.code(CONFIG_STATUS_HTTP.SUCCESS).send({
      message: CONFIG_MESSAGE.BAD_REQUEST,
      http_status: CONFIG_STATUS_HTTP.BAD_REQUEST,
      error: [],
      data: null,
    } as TResponseBase);

    return;
  }

  if (error instanceof AppAccessDenied) {
    reply.code(CONFIG_STATUS_HTTP.SUCCESS).send({
      message: CONFIG_MESSAGE.ACCESS_DENIED,
      http_status: CONFIG_STATUS_HTTP.ACCESS_DENIED,
      error: [],
      data: null,
    } as TResponseBase);

    return;
  }

  reply.code(CONFIG_STATUS_HTTP.SUCCESS).send({
    message: CONFIG_MESSAGE.SERVER_INTERNAL,
    http_status: CONFIG_STATUS_HTTP.SERVER_INTERNAL,
    error: [],
    data: null,
  } as TResponseBase);
};

export default errorHandler;
