import type { FastifyReply, FastifyRequest, RouteGenericInterface } from 'fastify';

export type TResponseBase = {
  http_status: number;
  message: string;
  error: any[];
  data: unknown;
};

export type Handler<T extends RouteGenericInterface = RouteGenericInterface> = (
  request: FastifyRequest<T>,
  reply: FastifyReply,
) => Promise<void>;
