import { index, timestamp, uuid, varchar, integer, text, pgSchema } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { postEstateModel } from './postEstate.model';

export const postEstateHistoryModel = pgSchema(process.env.SCHEMA_POSTGRES || "").table(
  'post_estate_history',
  {
    id: uuid('id')
      .default(sql`gen_random_uuid()`)
      .primaryKey(),

    /** @title id tin đăng */
    postEstateId: uuid('post_estate_id')
      .notNull()
      .references(() => postEstateModel.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),

    note: text('node'),

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
      idxPostEstateHistoryId: index('post_estate_history_id_idx').on(table.postEstateId, table.id),
    };
  },
);
