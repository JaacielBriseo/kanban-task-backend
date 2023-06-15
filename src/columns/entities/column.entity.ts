import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from '../../boards/entities/board.entity';
import { Task } from '../../tasks/entities/task.entity';

@Entity({ name: 'columns' })
@ObjectType()
export class ColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  columnName: string;

  @ManyToOne(() => Board, (board) => board.columns)
  board: Board;

  @OneToMany(() => Task, (task) => task.column, { lazy: true })
  @Field(() => [Task])
  tasks: Task[];
}
