import { index, timestamp, uuid, varchar, integer, text, pgSchema } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const commonLandModel = pgSchema("bds_products").table(
  'common_land',
  {
    id: uuid('id')
      .default(sql`gen_random_uuid()`)
      .primaryKey(),

    name: varchar('name', { length: 255 }).notNull(),

    code: varchar('code', { length: 255 }).notNull(),

    slug: varchar('slug', { length: 255 }).notNull(),

    content: text('content'),

    provinceCode: integer('province_code').notNull(),

    districtCode: integer('district_code').notNull(),

    wardCode: integer('ward_code').notNull(),

    status: integer('status').default(1),

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
      idxCommonLandNameSlugId: index('common_land_name_slug_id_idx').on(table.name, table.slug, table.id),
    };
  },
);
