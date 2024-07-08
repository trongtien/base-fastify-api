import { and, eq, inArray, sql, SQL } from 'drizzle-orm';
import { PgSelect } from 'drizzle-orm/pg-core';
import { ModalQuery, NodeDatabase, ObjWriteInterface, QueryResultPagination } from 'infrastructure/interface/drizzle.type';

export class BaseRepository {
  protected db: NodeDatabase;
  #modalConnection: ModalQuery;

  constructor(db: NodeDatabase, modal: ModalQuery) {
    this.db = db;
    this.#modalConnection = modal;
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
   * @param obj value insert schema
   * @returns object | null
   */
  public async insert<T>(obj: ObjWriteInterface): Promise<T> {
    const $query = await this.db
      .insert(this.#modalConnection)
      .values({ ...obj })
      .returning();

    return this.transformArrayToObject($query);
  }

  /**
   * TODO: Base repo insert many value generic type response
   * @param arrayObj value array insert schema
   * @returns boolean
   */
  public async insertMany(arrayObj: ObjWriteInterface[]): Promise<boolean> {
    await this.db
      .insert(this.#modalConnection)
      .values([...arrayObj])
      .returning();

    return true;
  }

  /**
   * TODO: Base repo update value generic type response
   * @param obj value update schema
   * @returns return object | null
   */
  public async update<T>(obj: ObjWriteInterface): Promise<T> {
    const $query = await this.db
      .update(this.#modalConnection)
      .set({ ...obj })
      .returning();
    return this.transformArrayToObject($query);
  }

  /**
   * TODO: Base repo update many value generic type response
   * @param arrayObj value array update schema
   * @returns boolean
   */
  public async updateMany(arrayObj: ObjWriteInterface[]): Promise<boolean> {
    for (let obj of arrayObj) {
      await this.update(obj);
    }

    return true;
  }

  /**
   * TODO: Base repo delete value with key id
   * @param id value id item delete string or array string
   * @returns boolean
   */
  public async deleteById(id: string | string[]): Promise<boolean> {
    const hasArray = Array.isArray(id);
    const $sql = hasArray ? inArray(this.#modalConnection.id, id) : eq(this.#modalConnection.id, id);

    await this.db.delete(this.#modalConnection).where($sql);
    return true;
  }

  /**
   * TODO: Base repo delete value with object key and value
   * @param objKeyValue object key and value from query
   * @returns boolean
   */
  public async deleteByKey(objKeyValue: Record<string, string | number>): Promise<boolean> {
    // Mapper sql to objKeyValue
    let $sqlChunk: SQL[] = [];
    for (const key in objKeyValue) {
      const hasValue = objKeyValue[key] !== undefined && objKeyValue[key] !== null;
      if (!hasValue) continue;

      $sqlChunk.push(eq(this.#modalConnection[key], objKeyValue[key]));
    }

    await this.db.delete(this.#modalConnection).where(and(sql.join($sqlChunk)));
    return true;
  }

  /**
   * TODO: Base repo find fist by key
   * @param objKeyValue object key and value from query
   * @returns object | null
   */
  public async findByKey(objKeyValue: Record<string, string | number>) {
    let $sqlChunk: SQL[] = [];
    for (const key in objKeyValue) {
      const hasValue = objKeyValue[key] !== undefined && objKeyValue[key] !== null;
      if (!hasValue) continue;

      $sqlChunk.push(eq(this.#modalConnection[key], objKeyValue[key]));
    }

    const $query = await this.db
      .select()
      .from(this.#modalConnection)
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
