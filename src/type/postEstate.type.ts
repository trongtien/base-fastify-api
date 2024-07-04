import { RouteGenericInterface } from 'fastify';

export enum PostEstateType {}

export enum PostEstateIsOwner {
  notOwner = 0,
  owner = 1,
}

export interface ICreatePostEstateRouteInterface extends RouteGenericInterface {
  Body: {
    title: string;
    code: string;
    slug: string;
    lat?: number;
    lang?: number;
    address: string;
    street: string;
    type: number;
    youtube_url?: string;
    province_code: number;
    district_code: number;
    ward_code: number;
    content?: string;
    acreage?: number;
    facade?: number;
    num_way_in?: number;
    price?: number;
    unit?: number;
    price_square_metre?: number;
    direction_house?: number;
    num_bed_room?: number;
    direction_balcony?: number;
    num_road_house?: number;
    num_floors?: number;
    num_bathroom?: number;
    furniture?: string;
    house_owning_document?: string;
    contact_name?: string;
    contant_phone?: string;
    contact_mail?: string;
  };
}
