import { commonLandModel } from 'domain/entities';

export type CommonLandModelWrite = typeof commonLandModel.$inferInsert;
export type CommonLandModelRead = typeof commonLandModel.$inferSelect;
