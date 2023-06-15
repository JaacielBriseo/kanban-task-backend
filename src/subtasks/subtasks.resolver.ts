import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubtasksService } from './subtasks.service';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskInput } from './dto/create-subtask.input';
import { UpdateSubtaskInput } from './dto/update-subtask.input';

@Resolver(() => Subtask)
export class SubtasksResolver {
  constructor(private readonly subtasksService: SubtasksService) {}

  @Mutation(() => Subtask)
  createSubtask(@Args('createSubtaskInput') createSubtaskInput: CreateSubtaskInput) {
    return this.subtasksService.create(createSubtaskInput);
  }

  @Query(() => [Subtask], { name: 'subtasks' })
  findAll() {
    return this.subtasksService.findAll();
  }

  @Query(() => Subtask, { name: 'subtask' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subtasksService.findOne(id);
  }

  @Mutation(() => Subtask)
  updateSubtask(@Args('updateSubtaskInput') updateSubtaskInput: UpdateSubtaskInput) {
    return this.subtasksService.update(updateSubtaskInput.id, updateSubtaskInput);
  }

  @Mutation(() => Subtask)
  removeSubtask(@Args('id', { type: () => Int }) id: number) {
    return this.subtasksService.remove(id);
  }
}
