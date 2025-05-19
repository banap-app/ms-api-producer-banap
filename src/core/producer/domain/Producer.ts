import { Entity } from '../../shared/domain/Entity';
import { Uuid } from '../../shared/domain/value-objects/UuidVo';
import { Password } from './PasswordVo';
import { ProducerValidatorFactory } from './ProducerValidator';
import { ProfilePicture } from './ProfilePictureVo';
import { TypeUser } from './TypeUser';

export type ProducerConstructorProps = {
  producerId?: ProducerId;
  name: string;
  email: string;
  password: Password;
  profilePicture?: ProfilePicture | null;
  isActive: boolean;
  typeUser: TypeUser;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type ProducerCreateCommand = {
  name: string;
  email: string;
  password: string;
  typeUser: TypeUser;
  profilePicture?: ProfilePicture | null;
  isActive: boolean;
};

export class ProducerId extends Uuid {}

export class Producer extends Entity {
  private producerId: ProducerId;
  private name: string;
  private email: string;
  private password: Password;
  private profilePicture: ProfilePicture | null;
  private isActive: boolean;
  private typeUser: TypeUser;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: ProducerConstructorProps) {
    super();
    this.producerId = props.producerId ?? new ProducerId();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password as Password;
    this.profilePicture = props.profilePicture;
    this.isActive = props.isActive;
    this.typeUser = props.typeUser;
    this.createdAt = props.createdAt ? props.createdAt : new Date();
    this.updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.deletedAt = props.deletedAt ? props.deletedAt : null;
  }

  static create(props: ProducerCreateCommand) {
    const [passwordValid, errorPassword] = Password.create(
      props.password,
    ).asArray();

    const producer = new Producer({
      ...props,
      password: passwordValid,
    });

    if (errorPassword) {
      producer.notification.addError(errorPassword.message, 'password');
    }

    producer.validate([]);
    return producer;
  }

  public validate(fields?: string[]) {
    const producerValidate = ProducerValidatorFactory.create();
    return producerValidate.validate(this.notification, this, fields);
  }

  public changeName(name: string) {
    this.name = name;
    this.validate(['name']);
  }

  public changeEmail(email: string) {
    this.email = email;
    this.validate(['email']);
  }

  public changePassword(password: string) {
    const [passwordValid, errorPassword] = Password.create(password).asArray();
    this.notification.addError(errorPassword.message, 'password');
    this.password = passwordValid;
  }

  public changePasswordHashed(hashedPassword: string) {
    this.password = hashedPassword as any;
  }

  public activate() {
    if (this.deletedAt !== null || this.deletedAt !== undefined) {
      this.deletedAt = null;
    }
    this.isActive = true;
  }

  public deactive() {
    this.isActive = false;
    this.deletedAt = new Date();
  }

  public changeProfilePicture(profilePicture: ProfilePicture) {
    this.profilePicture = profilePicture;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
  public getDeletedAt(): Date | null {
    return this.deletedAt;
  }

  public getProfilePicture(): ProfilePicture {
    return this.profilePicture;
  }

  public getTypeUser(): TypeUser {
    return this.typeUser;
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
      deletedAt: this.deletedAt,
    };
  }

  get getId() {
    return this.producerId;
  }
}
