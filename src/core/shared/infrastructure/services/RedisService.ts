import { RedisClientType } from 'redis';
import { EntitiesCache, ICache } from '../../application/ICache';
import { Entity } from '../../domain/Entity';
import { createHash, Hash } from 'node:crypto';

export class RedisService<EntityCache extends Entity>
  implements ICache<EntityCache>
{
  constructor(
    private readonly redisClient: RedisClientType,
    private readonly timeToExpire?: number,
  ) {}
  async get(key: string): Promise<any> {
    const raw = await this.redisClient.get(key);

    if (raw === null) return null;

    return JSON.parse(raw);
  }

  async set(
    entityToCache: EntitiesCache<EntityCache> | EntityCache,
    timeToExpire?: number,
  ): Promise<boolean> {
    let keyCache: string;

    let entityJson: string;

    if (typeof entityToCache == 'object' && 'entityArray' in entityToCache) {
      entityToCache = entityToCache as EntitiesCache<EntityCache>;

      const className = Object(
        entityToCache.entityArray[0],
      ).constructor.name.toLowerCase();

      keyCache = `${className}:${entityToCache.key}`;

      delete entityToCache.key;

      entityJson = JSON.stringify(entityToCache);
    } else {
      const className = Object(entityToCache).constructor.name.toLowerCase();

      keyCache = `${className}:${Object(entityToCache)[className + 'Id']}`;

      entityJson = JSON.stringify(entityToCache);
    }

    await this.redisClient.set(keyCache, entityJson, {
      EX: timeToExpire
        ? timeToExpire
        : this.timeToExpire
          ? this.timeToExpire
          : 45,
    });

    return true;
  }

  async isCached(key: string): Promise<boolean> {
    const raw = await this.redisClient.get(key);
    if (raw === null) return false;
    return true;
  }
  async delete(key: string): Promise<boolean> {
    return Boolean(await this.redisClient.del(key));
  }
  async update(
    key: string,
    entityToCache: EntityCache | EntityCache[],
  ): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
