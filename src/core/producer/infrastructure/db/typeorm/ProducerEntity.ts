import { Producer } from "src/core/producer/domain/Producer";
import { ProfilePicture } from "src/core/producer/domain/ProfilePictureVo";
import { Column, Entity, PrimaryGeneratedColumn, Generated, OneToOne, JoinColumn } from "typeorm";




@Entity({name:"profile_picture_entity"})
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
    producerId: string
    name: string
    email: string
    password: string
    isActive: boolean
    profilePicture: ProfilePicture
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

@Entity({ name: "producer" })
export class ProducerEntity {
  @PrimaryGeneratedColumn("uuid")
  producer_id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 300 })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "boolean" })
  isActive: boolean;

  @OneToOne(() => ProfilePictureEntity, { cascade: true, nullable: true })
  @JoinColumn()
  profilePicture?: ProfilePictureEntity;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp" })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;

  // ✨ Factory para criar a entidade fora do TypeORM (sem interferir na lib)
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
    return entity;
  }
}
