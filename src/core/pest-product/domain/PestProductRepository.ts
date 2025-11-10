import { Entity } from "src/core/shared/domain/Entity";
import { ValueObject } from "src/core/shared/domain/ValueObject";
import { Culture, PestProduct } from "./PestProduct";

export interface IPestProductRepository<entityId extends ValueObject, entity extends Entity> {
    findById(id: entityId): Promise<entity | null>
    findByCultureAndSearchTerm(culture: Culture, searchTerm: string): Promise<PestProduct | null>
    insert(pestProduct: entity): Promise<Boolean>
}