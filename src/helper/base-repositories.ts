import { ModalQuery, QueryResultPagination } from './../type/drizzle.type';
import { and, eq, inArray, sql, SQL } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';
import { NodeDatabase, ObjWriteInterface } from 'type/drizzle.type';

export class BaseRepository {
  protected db: NodeDatabase;

  constructor(db: NodeDatabase) {
    this.db = db;
  }

  /**
   * TODO: Check data if array convert to object, if data undefined return null
   * @param data
   * @returns object | null
   */
  public transformArrayToObject<T>(data: unknown) {
    const hasArray = Array.isArray(data);
    if (hasArray) {
      return data?.[0] ?? null;
    }

    if (!data) return null;

    return data as T;
  }

  /**
   * TODO: Base repo insert value generic type response
   * @param model type model schema and table insert
   * @param obj value insert schema
   * @returns object | null
   */
  public async insert<T>(model: ModalQuery, obj: ObjWriteInterface): Promise<T> {
    const $query = await this.db
      .insert(model)
      .values({ ...obj })
      .returning();

    return this.transformArrayToObject($query);
  }

  /**
   * TODO: Base repo insert many value generic type response
   * @param model type model schema and table insert
   * @param arrayObj value array insert schema
   * @returns boolean
   */
  public async insertMany(model: ModalQuery, arrayObj: ObjWriteInterface[]): Promise<boolean> {
    await this.db
      .insert(model)
      .values([...arrayObj])
      .returning();

    return true;
  }

  /**
   * TODO: Base repo update value generic type response
   * @param model type model schema and table insert
   * @param obj value update schema
   * @returns return object | null
   */
  public async update<T>(modal: ModalQuery, obj: ObjWriteInterface): Promise<T> {
    const $query = await this.db
      .update(modal)
      .set({ ...obj })
      .returning();
    return this.transformArrayToObject($query);
  }

  /**
   * TODO: Base repo update many value generic type response
   * @param model type model schema and table insert
   * @param arrayObj value array update schema
   * @returns boolean
   */
  public async updateMany(model: ModalQuery, arrayObj: ObjWriteInterface[]): Promise<boolean> {
    for (let obj of arrayObj) {
      await this.update(model, obj);
    }

    return true;
  }

  /**
   * TODO: Base repo delete value with key id
   * @param model type model schema and table delete
   * @param id value id item delete string or array string
   * @returns boolean
   */
  public async deleteById(model: ModalQuery, id: string | string[]): Promise<boolean> {
    const hasArray = Array.isArray(id);
    const $sql = hasArray ? inArray(model.id, id) : eq(model.id, id);

    await this.db.delete(model).where($sql);
    return true;
  }

  /**
   * TODO: Base repo delete value with object key and value
   * @param model type model schema and table delete
   * @param objKeyValue object key and value from query
   * @returns boolean
   */
  public async deleteByKey(model: ModalQuery, objKeyValue: Record<string, string | number>): Promise<boolean> {
    // Mapper sql to objKeyValue
    let $sqlChunk: SQL[] = [];
    for (const key in objKeyValue) {
      const hasValue = objKeyValue[key] !== undefined && objKeyValue[key] !== null;
      if (!hasValue) continue;

      $sqlChunk.push(eq(model[key], objKeyValue[key]));
    }

    await this.db.delete(model).where(and(sql.join($sqlChunk)));
    return true;
  }


   /**
   * TODO: Base repo find fist by key
   * @param model type model schema and table delete
   * @param objKeyValue object key and value from query
   * @returns object | null
   */
  public async findByKey(model: ModalQuery, objKeyValue: Record<string, string | number>) {
    let $sqlChunk: SQL[] = [];
    for (const key in objKeyValue) {
      const hasValue = objKeyValue[key] !== undefined && objKeyValue[key] !== null;
      if (!hasValue) continue;

      $sqlChunk.push(eq(model[key], objKeyValue[key]));
    }

    const $query = await this.db
      .select()
      .from(model)
      .where(and(sql.join($sqlChunk)))
      .limit(1);
    return this.transformArrayToObject($query);
  }

  public async pagination<T extends PgSelect>(query: T, page: number, limit: number): Promise<QueryResultPagination> {
    const subQuery = query.as('sub');
    const totalRecordsQuery = this.db.select({ total: sql<number>`count(*)` }).from(subQuery);

    const totalRecordsResult = await totalRecordsQuery.execute();
    const totalRecords = Number(totalRecordsResult[0].total);
    const totalPages = Math.ceil(totalRecords / limit);

    const $offset = (page - 1) * limit;
    query.limit(limit).offset($offset);

    const results = (await query.execute()) as T[];

    return {
      data: results,
      pagination: {
        totalRecords: totalRecords,
        totalPages: totalPages,
        currentPage: page,
        limit: limit,
      },
    };
  }
}
