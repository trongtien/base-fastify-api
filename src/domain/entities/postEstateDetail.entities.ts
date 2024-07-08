import { timestamp, uuid, varchar, integer, real, text, numeric, pgSchema } from 'drizzle-orm/pg-core';
import { postEstateModel } from '.';
import { sql } from 'drizzle-orm';

export const postEstateDetailModel = pgSchema(process.env.SCHEMA_POSTGRES || "").table(
  'post_estate_detail',
  {
    id: uuid('id')
      .default(sql`gen_random_uuid()`)
      .primaryKey(),


    postEstateId: uuid('post_estate_id').references(() => postEstateModel.id, {
      onDelete: 'cascade',
    }),

    /** @title Nội dung mô tả bài đăng */
    content: text('content'),

    /** @title Diện tích*/
    acreage: real('acreage'),

    /** @title Mặt tiền nhà*/
    facade: real('facade'),

    /** @title Đường vào nhà */
    numWayIn: real('num_way_in'),

    /** @title Giá tiền */
    price: numeric('price'),

    /** @title Đơn vị */
    unit: integer('unit').notNull().default(0),

    /** @title Giá tiền tới khoản*/
    priceSquareMetre: numeric('price_square_metre'),

    /** @title Hướng nhà */
    directionHouse: varchar('direction_house', { length: 100 }),

    /** @title Hướng ban công */
    directionBalcony: varchar('direction_balcony', { length: 100 }),

    /** @title Số  phòng ngủ */
    numBedroom: integer('num_bedroom'),

    /** @title Nhà mặt tiền */
    numRoadHouse: integer('num_road_House'),

    /** @title Số tầng */
    numFloors: integer('num_floors'),

    /** @title Số phòng tắm */
    numBathroom: integer('num_bathroom'),

    /** @title Đồ nội thất */
    furniture: varchar('furniture', { length: 255 }),

    /** @title Giấy tờ pháp lý */
    houseOwningDocument: text('house_owning_document'),

    /** @title Tên liên hệ */
    contactName: varchar('contact_name', { length: 255 }),

    /** @title Số điện thoại liên hệ */
    contactPhone: varchar('contact_phone', { length: 255 }),

    /** @title Mail liên hệ */
    contactMail: varchar('contact_mail', { length: 100 }),

    createdBy: varchar('created_by', { length: 255 }),

    createdAt: timestamp('created_at')
      .notNull()
      .default(sql`now()`),
    modifyBy: varchar('modify_by', { length: 255 }),

    modifyAt: timestamp('modify_at')
      .notNull()
      .default(sql`now()`)
      .$onUpdate(() => new Date()),
  },
  (table) => {
    return {};
  },
);
