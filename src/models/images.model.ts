import { index, timestamp, uuid, varchar, integer, pgSchema } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { postEstateModel } from './postEstate.model';

export const imageModel = pgSchema(process.env.SCHEMA_POSTGRES  || '').table(
  'images',
  {
    id: uuid('id')
      .default(sql`gen_random_uuid()`)
      .primaryKey(),

    link: varchar('link', { length: 255 }).notNull(),

    type: integer('type').notNull().default(0),

    position: integer('position').default(0),

    isAvatar: integer('is_avatar').notNull().default(0),

    description: varchar('description', { length: 255 }),

    isUsed: integer('is_used').default(0),

    postEstateId: uuid('post_estate_id').references(() => postEstateModel.id, {
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }),

    isConfirmUpdate: integer('is_confirm_update').notNull().default(0),

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
      idxNameId: index('image_link_id_idx').on(table.link, table.id),
    };
  },
);
