import { Entity } from '../domain/Entity';

export type EntitiesCache<EntityCache extends Entity> = {
  entityArray: EntityCache[], key:string
}
export interface ICache<EntityCache extends Entity> {
  get(key: string): Promise<any>;
  set(
    entityToCache: EntitiesCache<EntityCache> | EntityCache,
    timeToExpire?: number,
  ): Promise<boolean>;
  delete(key: string): Promise<boolean>;
  isCached(key: string): Promise<boolean>;
  update(
    key: string,
    entityToCache: EntityCache[] | EntityCache,
  ): Promise<boolean>;
}
