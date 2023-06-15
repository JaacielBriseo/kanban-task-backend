import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { ColumnEntity } from '../../columns/entities/column.entity';

@Entity({ name: 'boards' })
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  boardName: string;

  @OneToMany(() => ColumnEntity, (column) => column.board, {
    lazy: true,
    // cascade: true,
  })
  @Field(() => [ColumnEntity])
  columns: ColumnEntity[];

  @ManyToOne(() => User, (user) => user.boards, { lazy: true, nullable: false })
  @Index('userId-board-index')
  @Field(() => User)
  user: User;
}
