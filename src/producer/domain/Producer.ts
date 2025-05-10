import { Entity } from "../../shared/domain/Entity";
import { Notification } from "../../shared/domain/validators/Notification";
import { Uuid } from "../../shared/domain/value-objects/UuidVo";
import { Password } from "./PasswordVo";
import { ProducerValidatorFactory } from "./ProducerValidator";
import { ProfilePicture } from "./ProfilePictureVo";

export type ProducerConstructorProps = {
    producerId?: string
    name: string
    email: string
    password: string
    profilePicture: ProfilePicture | null
    isActive: boolean
    createdAt?: Date
    updatedAt?: Date
    deletedAt?: Date
}

export type ProducerCreateCommand = {
    name: string
    email: string
    password: string
    profilePicture: ProfilePicture | null
    isActive: boolean
}

export class ProducerId extends Uuid { }

export class Producer extends Entity {
    private producerId: ProducerId
    private name: string
    private email: string
    private password: Password
    private profilePicture: ProfilePicture | null
    private isActive: boolean
    private createdAt: Date
    private updatedAt: Date
    private deletedAt: Date | null

    constructor(props: ProducerConstructorProps) {
        super()
        this.producerId = props.producerId ? new ProducerId(props.producerId) : new ProducerId()
        this.name = props.name
        this.email = props.email
        console.log(props.password)
        this.password = props.password ? new Password(props.password) : new Password()
        this.profilePicture = props.profilePicture
        this.isActive = props.isActive
        this.createdAt = props.createdAt ? props.createdAt : new Date()
        this.updatedAt = props.updatedAt ? props.updatedAt : new Date()
        this.deletedAt = props.deletedAt ? props.deletedAt : null
    }

    static create(props:ProducerCreateCommand) {
        const producer = new Producer(props)
        const v = producer.validate([])
        return producer
    }

    private validate(fields: string[]) {
        const producerValidate = ProducerValidatorFactory.create()
        return producerValidate.validate(new Notification(), this, fields)

    } 

    toJSON() {
        return {
            producerId: this.producerId.id,
            name: this.name,
            email: this.email,
            password: this.password,
            profilePicture: this.profilePicture,
            isActive: this.isActive,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        }
    }

    get getId() {
        return this.producerId
    }
}