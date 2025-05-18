import { TypeUser } from 'src/core/producer/domain/TypeUser';
import { ProfilePicture } from '../../../../../core/producer/domain/ProfilePictureVo';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'type_users' })
export class TypeUserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'type_name', nullable: false, unique: true })
  typeName: string;

  constructor(props?: { typeName: string; id: number }) {
    if (props) {
      this.typeName = props.typeName;
      this.id = props.id;
    }
  }

  static fromVo(vo: TypeUser): TypeUserEntity {
    if (vo === TypeUser.NULL) {
      throw new Error('Tipo de usuário inválido: NULL');
    }
    return new TypeUserEntity({
      id: vo,
      typeName: TypeUser[vo],
    });
  }
}


@Entity({ name: 'profile_picture_entity' })
export class ProfilePictureEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  location: string;

  constructor(props?: { name: string; location: string }) {
    if (props) {
      this.name = props.name;
      this.location = props.location;
    }
  }

  static fromVo(vo: ProfilePicture): ProfilePictureEntity {
    return new ProfilePictureEntity({
      name: vo.name,
      location: vo.location,
    });
  }
}

export type ProducerConstructorProps = {
  producerId: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  profilePicture: ProfilePicture;
  typeUser: TypeUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
};

@Entity({ name: 'users' })
export class ProducerEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  producer_id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean' })
  isActive: boolean;

  @ManyToOne(() => TypeUserEntity)
  @JoinColumn({ name: 'type_user_id', referencedColumnName: 'id' })
  typeUser: TypeUserEntity;

  @OneToOne(() => ProfilePictureEntity, { cascade: true, nullable: true })
  @JoinColumn()
  profilePicture?: ProfilePictureEntity;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deletedAt: Date;

  static fromDomain(props: ProducerConstructorProps): ProducerEntity {
    const entity = new ProducerEntity();
    entity.producer_id = props.producerId;
    entity.name = props.name;
    entity.email = props.email;
    entity.password = props.password;
    entity.isActive = props.isActive;
    entity.profilePicture = props.profilePicture
      ? ProfilePictureEntity.fromVo(props.profilePicture)
      : undefined;
    entity.createdAt = props.createdAt;
    entity.updatedAt = props.updatedAt;
    entity.deletedAt = props.deletedAt;
    entity.typeUser = TypeUserEntity.fromVo(props.typeUser);
    return entity;
  }
}
