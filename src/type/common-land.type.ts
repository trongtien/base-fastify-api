import { RouteGenericInterface } from "fastify"
import { commonLandModel } from "models"
import { CommonSchema } from "modules/commonLand/common-land.schema"

export type  CommonLandModelWrite = typeof commonLandModel.$inferInsert

export interface CreateCommonLandRouteInterface extends RouteGenericInterface {
    Body: {
        name: string,
        code: string,
        province_code: number,
        district_code: number,
        ward_code: number
    }
}

export interface CreateCommonLandInterface {
    name: string
    code: string
    provinceCode: number
    districtCode: number
    wardCode: number
}

export interface UpdateCommonLandInterface extends CreateCommonLandInterface{
    id: string
}