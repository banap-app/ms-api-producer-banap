import { ProfilePicture } from "src/core/producer/domain/ProfilePictureVo"

export type UpdateProducerCommandProps = {
    producer_id: string;
    name: string
    email: string
    password: string
    isActive: boolean
    profilePicture: ProfilePicture
}

export class UpdateProducerCommand {
    public producer_id: string;
    public name: string
    public email: string
    public password: string
    public profilePicture: ProfilePicture
    public isActive: boolean


    constructor(props:UpdateProducerCommandProps) {
        if(!props) return
        this.producer_id = props.producer_id
        this.name = props.name
        this.email = props.email
        this.password = props.password
        this.profilePicture = props.profilePicture
        this.isActive = props.isActive
    }
}