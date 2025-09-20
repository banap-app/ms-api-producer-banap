import { Entity } from "src/core/shared/domain/Entity";
import { Uuid } from "src/core/shared/domain/value-objects/UuidVo";
import { ValueObject } from "src/core/shared/domain/ValueObject";

export class EngineerId extends Uuid {}

export class SimpleEngineer extends Entity {
    private engineerId: EngineerId

    constructor(engineerId: string) {
        super()
        this.engineerId = new EngineerId(engineerId)
    }

    get getId(): ValueObject {
        throw new Error("Method not implemented.");
    }
    toJSON() {
        return {
            engineerId: this.engineerId
        }
    }
    
}