import { index, timestamp, uuid, varchar, integer, real, text, pgSchema } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const postEstateModel = pgSchema(process.env.SCHEMA_POSTGRES || "").table(
  'post_estate',
  {
    id: uuid('id')
      .default(sql`gen_random_uuid()`)
      .primaryKey(),

    /** @title Tên bài đăng */
    title: varchar('title', { length: 255 }).notNull(),

    /** @title Remove vn title */
    slug: varchar('slug', { length: 255 }).notNull(),

    /** @title Mã bài đăng */
    code: varchar('code', { length: 255 }).notNull(),

    /** @title Địa chỉ hiển thị tin đăng */
    address: varchar('title', { length: 255 }),

    /** @title Thông tin đường phố  */
    street: varchar('street', { length: 255 }),

    lat: real('lat').default(0),

    lang: real('lang').default(0),

    /** @title Loại dự án */
    type: integer('type').notNull().default(0),

    /** @title youtube url */
    youtubeUrl: text('youtube_url'),

    /** @title Điểm bài viết */
    point: real('point').notNull(),

    /** @title tinh thành */
    provinceCode: integer('province_code').notNull(),

    /** @title quận huyện */
    districtCode: integer('district_code').notNull(),

    /** @title phường xã */
    wardCode: integer('ward_code').notNull(),

    /** @title id thông tin người đăng */
    customerId: uuid('customer_id').notNull(),

    /** @title Ghi chú cancel bài viết */
    noteVerified: text('note_verified'),

    /** @title Khóa bài viết */
    isBlock: integer('is_block').notNull().default(0),

    /** @title Un active bài viết */
    isDelete: integer('is_delete').notNull().default(0),

    /** @title Chủ bài viết */
    isOwner: integer('is_owner').notNull().default(0),

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
    return {
      idxPostEstateNameSlugId: index('post_estate_name_slug_id_idx').on(table.title, table.slug, table.id),
    };
  },
);
