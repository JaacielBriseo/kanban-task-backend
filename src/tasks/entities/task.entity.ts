import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Subtask } from '../../subtasks/entities/subtask.entity';
import { ColumnEntity } from '../../columns/entities/column.entity';

@Entity({ name: 'tasks' })
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  title: string;

  @Column('text')
  @Field(() => String)
  description: string;

  @Column('text')
  @Field(() => String)
  status: string;

  @ManyToOne(() => ColumnEntity, (column) => column.tasks, {
    onDelete: 'CASCADE',
  })
  column: ColumnEntity;

  @OneToMany(() => Subtask, (subtask) => subtask.task, { lazy: true })
  @Field(() => [Subtask])
  subtasks: Subtask[];
}
