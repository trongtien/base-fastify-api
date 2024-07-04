import { FastifySchema } from 'fastify';
import { z } from 'zod';

export abstract class CommonSchema {
  public static createCommon: FastifySchema = {
    body: z.object({
      name: z.string(),
      code: z.string(),
      province_code: z.number(),
      district_code: z.number(),
      ward_code: z.number(),
    }),
  } as const;

  public static updateCommon: FastifySchema = {
    body: z.object({
      id: z.string(),
      name: z.string(),
      code: z.string(),
      province_code: z.number(),
      district_code: z.number(),
      ward_code: z.number(),
    }),
  };
}
