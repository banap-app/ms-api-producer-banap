import { Entity } from '../../shared/domain/Entity';
import { Uuid } from '../../shared/domain/value-objects/UuidVo';
import { Password } from './PasswordVo';
import { ProducerValidatorFactory } from './ProducerValidator';
import { ProfilePicture } from './ProfilePictureVo';

export type ProducerConstructorProps = {
  producerId?: ProducerId;
  name: string;
  email: string;
  password: string;
  profilePicture?: ProfilePicture | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
};

export type ProducerCreateCommand = {
  name: string;
  email: string;
  password: string;
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
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(props: ProducerConstructorProps) {
    super();
    this.producerId = props.producerId ?? new ProducerId();
    this.name = props.name;
    this.email = props.email;
    this.password = props.password ? new Password(props.password) : null;
    this.profilePicture = props.profilePicture;
    this.isActive = props.isActive;
    this.createdAt = props.createdAt ? props.createdAt : new Date();
    this.updatedAt = props.updatedAt ? props.updatedAt : new Date();
    this.deletedAt = props.deletedAt ? props.deletedAt : null;
  }

  static create(props: ProducerCreateCommand) {
    const producer = new Producer(props);
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
    this.isActive = true;
  }

  public deactive() {
    this.isActive = false;
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
