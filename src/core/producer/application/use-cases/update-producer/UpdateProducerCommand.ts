<<<<<<< HEAD
import { ProfilePicture } from "src/core/producer/domain/ProfilePictureVo"
import { TypeUser } from "src/core/producer/domain/TypeUser";

export type UpdateProducerCommandProps = {
    producerId: string;
    name: string
    email: string
    password: string
    isActive: boolean
    profilePicture: ProfilePicture
    typeUser: TypeUser
}

export class UpdateProducerCommand {
    public producerId: string;
    public name: string
    public email: string
    public password: string
    public profilePicture: ProfilePicture
    public isActive: boolean
    typeUser: TypeUser
=======
import { ProfilePicture } from 'src/core/producer/domain/ProfilePictureVo';

export type UpdateProducerCommandProps = {
  producerId: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  profilePicture: ProfilePicture;
};

export class UpdateProducerCommand {
  public producerId: string;
  public name: string;
  public email: string;
  public password: string;
  public profilePicture: ProfilePicture;
  public isActive: boolean;
>>>>>>> f03c679ba8cddfa4f52e02419ff1c9ce85e3bcdc

  constructor(props: UpdateProducerCommandProps) {
    if (!props) return;
    this.producerId = props.producerId;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.profilePicture = props.profilePicture;
    this.isActive = props.isActive;
  }
}
