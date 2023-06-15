import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity({ name: 'subtasks' })
@ObjectType()
export class Subtask {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column('text')
  @Field(() => String)
  title: string;

  @Column('boolean', { default: false })
  @Field(() => Boolean)
  isCompleted: boolean;

  @ManyToOne(() => Task, (task) => task.subtasks)
  task: Task;
}
