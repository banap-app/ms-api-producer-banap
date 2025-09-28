import { Entity } from '../domain/Entity';

export interface ICache<EntityCache extends Entity> {
  get(key: string): Promise<any>;
  set(
    entityToCache: EntityCache[] | EntityCache,
    timeToExpire?: number,
  ): Promise<boolean>;
  delete(key: string): Promise<boolean>;
  isCacheaded(key: string): Promise<boolean>;
  update(
    key: string,
    entityToCache: EntityCache[] | EntityCache,
  ): Promise<boolean>;
}
