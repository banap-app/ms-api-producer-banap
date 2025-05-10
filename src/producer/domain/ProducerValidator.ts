import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength } from "class-validator";
import { ClassValidatorRules } from "../../shared/domain/validators/ClassValidatorRules";
import { Notification } from "../../shared/domain/validators/Notification";
import { Producer } from "./Producer";
import { Password } from "./PasswordVo";

export class ProducerRules {
    constructor(entity: Producer) {
        Object.assign(this, entity)
    }

    @MaxLength(255, {
        groups: ['name']
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    @IsString({groups: ['email']})
    email:string

}

export class ProducerValidator extends ClassValidatorRules {
    validate(notification: Notification, data: any, fields?: string[]): boolean {
        const newFields = fields ? fields : ['name', 'email']
        return super.validate(notification, new ProducerRules(data), newFields)
    }
}


export class ProducerValidatorFactory {
    static create() {
        return new ProducerValidator()
    }
}