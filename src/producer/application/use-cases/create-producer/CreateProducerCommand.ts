import { ProfilePicture } from "../../../domain/ProfilePictureVo"

export type CreateProducerCommandProps = {
    name: string
    email: string
    password: string
    isActive: boolean
    profilePicture: ProfilePicture
}

export class CreateProducerCommand {
    public name: string
    public email: string
    public password: string
    public profilePicture: ProfilePicture
    public isActive: boolean


    constructor(props:CreateProducerCommandProps) {
        if(!props) return
        this.name = props.name
        this.email = props.email
        this.profilePicture = props.profilePicture
        this.isActive = props.isActive
    }
}