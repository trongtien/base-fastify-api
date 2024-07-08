import { RouteGenericInterface } from 'fastify';

export interface CreateCommonLandInterface extends RouteGenericInterface {
  Body: {
    name: string;
    code: string;
    province_code: number;
    district_code: number;
    ward_code: number;
  };
}
