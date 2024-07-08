import { imageModel } from 'domain/entities';
import { BaseRepository } from './base.repository';
import { FastifyBaseLogger, FastifyInstance } from 'fastify';
import { NodeDatabase } from 'infrastructure/interface/drizzle.type';
import { Redis } from 'ioredis';

export class ImageRepository extends BaseRepository {
  constructor(
    protected readonly driverDatabase: NodeDatabase,
    private readonly _driverRedis: Redis,
    private readonly _log: FastifyBaseLogger,
  ) {
    super(driverDatabase, imageModel);
  }
}
