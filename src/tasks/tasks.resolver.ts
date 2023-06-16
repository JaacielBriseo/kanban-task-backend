import { Resolver, Query, Mutation, Args,  ID } from '@nestjs/graphql';
import { ParseUUIDPipe } from '@nestjs/common';

import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { CreateTaskInput, UpdateTaskInput } from './dto';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
  ): Promise<Task> {
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  async findAll() {
    return this.tasksService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  async updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  async removeTask(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Task> {
    return this.tasksService.remove(id);
  }
}
