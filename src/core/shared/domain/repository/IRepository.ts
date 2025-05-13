import { Entity } from "../Entity";
import { ValueObject } from "../ValueObject";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
    insert(entity:E): Promise<void>
    bulkInsert(entities:E[]): Promise<void>
    update(entity:E): Promise<void>
    bulkUpdate(entities:E[]): Promise<void>
    delete(entity_id:EntityId): Promise<void>
    bulkDelete(entities_ids:EntityId[]): Promise<void>
    findAll(): Promise<E[]>
    findById(entity_id: EntityId): Promise<E>
    
}