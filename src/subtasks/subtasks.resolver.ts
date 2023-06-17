import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { SubtasksService } from './subtasks.service';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskInput, UpdateSubtaskInput } from './dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Subtask)
export class SubtasksResolver {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Mutation(() => Subtask)
  async createSubtask(
    @Args('createSubtaskInput') createSubtaskInput: CreateSubtaskInput,
  ): Promise<Subtask> {
    return this.subtasksService.create(createSubtaskInput);
  }

  @Query(() => [Subtask], { name: 'subtasks' })
  async findAll(): Promise<Subtask[]> {
    return this.subtasksService.findAll();
  }

  @Query(() => Subtask, { name: 'subtask' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Subtask> {
    return this.subtasksService.findOne(id);
  }

  @Mutation(() => Subtask)
  async updateSubtask(
    @Args('updateSubtaskInput') updateSubtaskInput: UpdateSubtaskInput,
  ): Promise<Subtask> {
    return this.subtasksService.update(
      updateSubtaskInput.id,
      updateSubtaskInput,
    );
  }

  @Mutation(() => Subtask)
  async removeSubtask(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<Subtask> {
    return this.subtasksService.remove(id);
  }
}
