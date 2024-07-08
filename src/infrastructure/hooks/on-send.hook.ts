import type { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';
import { CONFIG_MESSAGE } from 'infrastructure/config/message';
import { CONFIG_LIST_STATUS_ERROR, CONFIG_STATUS_HTTP } from 'infrastructure/config/status-reponse';
import { TResponseBase } from 'infrastructure/interface/error-handler.type';

const onSendHook = (_: FastifyRequest, __: FastifyReply, payload: any, done: DoneFuncWithErrOrRes): void => {
  const parsePayload = JSON.parse(payload);
  const hasError = parsePayload.http_status && CONFIG_LIST_STATUS_ERROR.includes(parsePayload.http_status);
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
    http_status: CONFIG_STATUS_HTTP.SUCCESS,
    message: CONFIG_MESSAGE.SUCCESS,
    data: parsePayload || null,
    error: [],
  };

  done(null, JSON.stringify(responseSuccess));
};

export default onSendHook;
