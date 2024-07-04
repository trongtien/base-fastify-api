import { index, timestamp, uuid, varchar, integer, pgSchema } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const postEstateReportModel = pgSchema(process.env.SCHEMA_POSTGRES || "").table(
  'post_estate_report',
  {
    id: uuid('id')
      .default(sql`gen_random_uuid()`)
      .primaryKey(),

    /** @title Mô tả nội dung report */
    description: varchar('description', { length: 255 }).notNull(),

    /** @title id tin đăng */
    postEstateId: uuid('post_estate_id').notNull(),

    /** @title id người report */
    customerId: uuid('customer_id'),

    /** @title name người report */
    contactName: varchar('contact_name', { length: 50 }),

    /** @title phone người report */
    contactPhone: varchar('contact_phone', { length: 20 }),

    /** @title email người report */
    contactMail: varchar('contact_mail', { length: 50 }),

    /** @title trạng thái xử lý */
    isConfirmed: integer('is_confirmed').notNull().default(0),

    /** @title danh sách id report */
    // @Column({ name: 'parents_id', type: 'varchar', nullable: true, default: null })
    // parentsId: string | null;

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
      idxPostEstateReportNameId: index('post_estate_report_name_id_idx').on(table.contactName, table.id),
    };
  },
);
