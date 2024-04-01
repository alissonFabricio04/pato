import { Entity, Column, PrimaryColumn, Index } from 'typeorm'

@Entity()
export default class UserEntity {
  @PrimaryColumn({
    unique: true,
  })
  id!: string

  @Index({ unique: true })
  @Column()
  username!: string

  @Index({ unique: true })
  @Column()
  email!: string

  @Column()
  password!: string

  @Index({ unique: true })
  @Column({
    name: 'profile_picture_uri',
    nullable: true,
  })
  profilePictureUri!: string

  @Column({
    name: 'profile_picture_media_type',
    nullable: true,
  })
  profilePictureMediaType!: string

  @Column({
    name: 'created_at',
    default: new Date(),
  })
  createdAt!: Date

  @Column({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt!: Date
}
