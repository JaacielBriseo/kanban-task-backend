import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubtasksService } from './subtasks.service';
import { Subtask } from './entities/subtask.entity';
import { CreateSubtaskInput, UpdateSubtaskInput } from './dto';

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
  async findAll() {
    return this.subtasksService.findAll();
  }

  @Query(() => Subtask, { name: 'subtask' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subtasksService.findOne(id);
  }

  @Mutation(() => Subtask)
  async updateSubtask(
    @Args('updateSubtaskInput') updateSubtaskInput: UpdateSubtaskInput,
  ) {
    return this.subtasksService.update(
      updateSubtaskInput.id,
      updateSubtaskInput,
    );
  }

  @Mutation(() => Subtask)
  async removeSubtask(@Args('id', { type: () => Int }) id: number) {
    return this.subtasksService.remove(id);
  }
}
