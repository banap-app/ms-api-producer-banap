import { RedisClientType } from 'redis';
import { ICache } from '../../application/ICache';
import { Entity } from '../../domain/Entity';

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
    entityToCache: EntityCache | EntityCache[],
    timeToExpire?: number,
  ): Promise<boolean> {
    const className = Object(entityToCache).constructor.name.toLowerCase();

    const keyCache: string = `${className}:${Object(entityToCache)[className + 'Id']}`;

    const entityJson = JSON.stringify(entityToCache);

    await this.redisClient.set(keyCache, entityJson, {
      EX: timeToExpire
        ? timeToExpire
        : this.timeToExpire
          ? this.timeToExpire
          : 15,
    });

    return true;
  }

  async isCacheaded(key: string): Promise<boolean> {
    const raw = await this.redisClient.get(key);
    if (raw === null) return false;
    return true;
  }
  delete(key: string): boolean {
    throw new Error('Method not implemented.');
  }
  update(key: string, entityToCache: EntityCache | EntityCache[]): boolean {
    throw new Error('Method not implemented.');
  }
}
