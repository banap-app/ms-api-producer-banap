import { Producer } from "../../../domain/Producer";
import { ProfilePicture } from "../../../domain/ProfilePictureVo";

export type ProducerOutput = {
    id: string
    name: string
    email: string
    isActive: boolean
    profilePicture: ProfilePicture
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}

export class ProducerOutputMapper {
    static toOutput(entity: Producer) {
        const {producerId,password, ...otherProps} = entity.toJSON()
        return {
            id: producerId,
            ...otherProps
        }
    }
}