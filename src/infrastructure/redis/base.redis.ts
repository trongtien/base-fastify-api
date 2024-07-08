import type { FastifyBaseLogger } from 'fastify';
import IoRedis from 'ioredis';

export const BaseRedis = (_appRedis: IoRedis, _logger: FastifyBaseLogger) => {
  function transformResult<T>(cacheData: string | null) {
    const hasEmptyData = cacheData === null || !cacheData;
    if (hasEmptyData) return null;

    const $data = JSON.parse(cacheData) === 'null' ? null : JSON.parse(cacheData)
    return $data as unknown as T;
  }

  async function getKey<T>(key: string): Promise<T | null> {
    try {
      const cacheData = await _appRedis.get(key);

      return transformResult<T>(cacheData);
    } catch (error) {
      _logger.error(`${BaseRedis.name} get key error ${error}`);
      return null;
    }
  }

  const setCacheKey = (key: string, data: any, ttl: number) => {
    try {
      const $dataSet = typeof data === 'string' ? data : JSON.stringify(data);

      _appRedis.set(key, $dataSet, 'EX', ttl);
    } catch (error) {
      _logger.error(`${BaseRedis.name} set key error ${error}`);
      return null;
    }
  };

  function removeCacheKey(key: string) {
    try {
      _appRedis.del(key);
    } catch (error) {
      _logger.error(`${BaseRedis.name} remove key error ${error}`);
      return null;
    }
  }

  return {
    getKey,
    setCacheKey,
    removeCacheKey,
  };
};
