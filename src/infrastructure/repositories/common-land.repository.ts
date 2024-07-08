import { commonLandModel } from 'domain/entities';
import { BaseRepository } from './base.repository';
import { BaseRedis } from 'infrastructure/redis/base.redis';
import { NodeDatabase } from 'infrastructure/interface/drizzle.type';
import { FastifyBaseLogger } from 'fastify';
import { Redis } from 'ioredis';

export class CommonLandRepository extends BaseRepository {
  #KEY_COMMON_LAND_NAME = 'KEY_COMMON_LAND_NAME';
  #KEY_COMMON_LAND_CODE = 'KEY_COMMON_LAND_CODE';
  #KEY_COMMON_LAND_ID = 'KEY_COMMON_LAND_ID';

  constructor(
    protected readonly driverDatabase: NodeDatabase,
    private readonly _driverRedis: Redis,
    private readonly _log: FastifyBaseLogger,
  ) {
    super(driverDatabase, commonLandModel);
  }

  public async getWithFieldName(name: string) {
    const $keyCache = `${this.#KEY_COMMON_LAND_NAME}_${name}`;

    const cacheData = await BaseRedis(this._driverRedis, this._log).getKey($keyCache);
    if (cacheData !== null) {
      return cacheData;
    }

    const $queryData = await this.findByKey({ name: name });
    BaseRedis(this._driverRedis, this._log).setCacheKey($keyCache, $queryData, 350);

    return $queryData;
  }

  public async getWithFieldCode(code: string) {
    const $keyCache = `${this.#KEY_COMMON_LAND_CODE}_${code}`;

    const cacheData = await BaseRedis(this._driverRedis, this._log).getKey($keyCache);
    if (cacheData !== null) {
      return cacheData;
    }

    const $queryData = await this.findByKey({ code: code });
    BaseRedis(this._driverRedis, this._log).setCacheKey($keyCache, $queryData, 350);

    return $queryData;
  }

  public async clearAllCacheCreate(name: string, code: string) {
    const $keyCacheName = `${this.#KEY_COMMON_LAND_NAME}_${name}`;
    const $keyCacheCode = `${this.#KEY_COMMON_LAND_CODE}_${code}`;

    BaseRedis(this._driverRedis, this._log).removeCacheKey($keyCacheName);
    BaseRedis(this._driverRedis, this._log).removeCacheKey($keyCacheCode);
  }

  public async getWithId(id: string) {
    const $keyCache = `${this.#KEY_COMMON_LAND_ID}_${id}`;
    const cacheData = await BaseRedis(this._driverRedis, this._log).getKey($keyCache);
    if (cacheData !== null) {
      return cacheData;
    }
    const $queryData = await this.findByKey({ id: id });

    BaseRedis(this._driverRedis, this._log).setCacheKey($keyCache, $queryData, 10000);
    return $queryData;
  }
}
