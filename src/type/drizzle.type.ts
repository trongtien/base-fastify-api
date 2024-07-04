import { InferInsertModel } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PgTableWithColumns, TableConfig } from 'drizzle-orm/pg-core';
import { drizzleSchema } from 'plugins/drizzle.plugin';

export type SchemaDatabase = typeof drizzleSchema;
export type NodeDatabase = NodePgDatabase<SchemaDatabase>;

export type ModalQuery = PgTableWithColumns<any>;

export interface ObjWriteInterface extends InferInsertModel<PgTableWithColumns<TableConfig>> {}

export interface QueryResultPagination {
  data: any;
  pagination: {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
}
