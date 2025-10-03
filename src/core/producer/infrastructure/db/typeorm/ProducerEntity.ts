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

@Entity('user_type')
export class TypeUserEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'type_name', nullable: false, unique: true })
  typeName: string;

  static fromVo(vo: TypeUser): TypeUserEntity {
    if (vo === TypeUser.NULL) {
      throw new Error('Tipo de usuário inválido: NULL');
    }
    const entity = new TypeUserEntity();
    entity.id = vo;
    entity.typeName = TypeUser[vo];
    return entity;
  }
}

@Entity('profile_picture_entity')
export class ProfilePictureEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'location' })
  location: string;

  static fromVo(vo: ProfilePicture): ProfilePictureEntity {
    const entity = new ProfilePictureEntity();
    entity.name = vo.name;
    entity.location = vo.location;
    return entity;
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

@Entity('users')
export class ProducerEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'boolean', name: 'is_active' })
  isActive: boolean;

  @Column({ type: 'int', name: 'user_type_id' })
  typeUserId: number;

  @ManyToOne(() => TypeUserEntity, { eager: true })
  @JoinColumn({ name: 'user_type_id' })
  typeUser: TypeUserEntity;

  // --- Foto de perfil ---
  @Column({ type: 'int', name: 'profile_picture_id', nullable: true })
  profilePictureId?: number;

  @OneToOne(() => ProfilePictureEntity, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'profile_picture_id' })
  profilePicture?: ProfilePictureEntity;

  @Column({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @Column({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamp', name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  static fromDomain(props: ProducerConstructorProps): ProducerEntity {
    const entity = new ProducerEntity();
    entity.id = props.producerId;
    entity.name = props.name;
    entity.email = props.email;
    entity.password = props.password;
    entity.isActive = props.isActive;
    entity.createdAt = props.createdAt;
    entity.updatedAt = props.updatedAt;
    entity.deletedAt = props.deletedAt;
    // Associações pelo TypeORM
    entity.typeUserId = props.typeUser;
    if (props.profilePicture) {
      const pic = ProfilePictureEntity.fromVo(props.profilePicture);
      entity.profilePicture = pic;
      // note: pic.id será gerado no insert
    }
    return entity;
  }
}
