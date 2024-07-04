import type { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { TResponseBase } from '../type/handler.type';
import { APP_LIST_STATUS_ERROR, APP_STATUS_HTTP } from '../helper/status-response.helper';
import { APP_MESSAGE } from '../helper/message.helper';

const onSendHook = (_: FastifyRequest, __: FastifyReply, payload: any, done: DoneFuncWithErrOrRes): void => {
  const parsePayload = JSON.parse(payload);
  const hasError = parsePayload.http_status && APP_LIST_STATUS_ERROR.includes(parsePayload.http_status);
  /*
   * Check response if error done payload
   * End request
   */
  if (hasError) {
    done(null, payload);
    return;
  }

  /*
   * Convert request susscess from repose type TResponseBase
   *
   */
  const responseSuccess: TResponseBase = {
    http_status: APP_STATUS_HTTP.SUCCESS,
    message: APP_MESSAGE.SUCCESS,
    data: parsePayload || null,
    error: [],
  };

  done(null, JSON.stringify(responseSuccess));
};

export default onSendHook;
