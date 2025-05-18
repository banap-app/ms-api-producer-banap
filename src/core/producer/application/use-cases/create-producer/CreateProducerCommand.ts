import { TypeUser } from "src/core/producer/domain/TypeUser"
import { ProfilePicture } from "../../../domain/ProfilePictureVo"

export type CreateProducerCommandProps = {
    name: string
    email: string
    password: string
    isActive: boolean
    profilePicture: ProfilePicture
    typeUser: TypeUser
}

export class CreateProducerCommand {
    public name: string
    public email: string
    public password: string
    public profilePicture: ProfilePicture
    public isActive: boolean
    public typeUser: TypeUser


    constructor(props:CreateProducerCommandProps) {
        if(!props) return
        this.name = props.name
        this.email = props.email
        this.password = props.password
        this.profilePicture = props.profilePicture
        this.isActive = props.isActive
        this.typeUser = props.typeUser
    }
}