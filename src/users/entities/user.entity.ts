import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Board } from '../../boards/entities/board.entity';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  fullName: string;

  @Column('text', { unique: true })
  @Field(() => String)
  email: string;

  @Column('text')
  @Field(() => String)
  password: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean)
  isActive: boolean;

  //? Boards relation
  @OneToMany(() => Board, (board) => board.user, { lazy: true })
  @Field(() => [Board])
  boards: Board[];
}
