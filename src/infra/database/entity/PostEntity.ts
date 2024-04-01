import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm'
import UserEntity from './UserEntity'

@Entity()
export default class PostEntity {
  @PrimaryColumn({
    unique: true,
  })
  id!: string

  @Index()
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  user!: UserEntity

  @Column()
  body!: string

  @Column({
    type: 'array',
  })
  attachments!: string[]

  @Column({
    type: 'int',
  })
  upvotes!: number

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
