import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ColumnsService } from './columns.service';
import { ColumnEntity } from './entities/column.entity';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => ColumnEntity)
export class ColumnsResolver {
  constructor(private readonly columnsService: ColumnsService) {}

  @Mutation(() => ColumnEntity)
  async createColumn(
    @Args('createColumnInput') createColumnInput: CreateColumnInput,
  ): Promise<ColumnEntity> {
    return this.columnsService.create(createColumnInput);
  }

  @Query(() => [ColumnEntity], { name: 'columns' })
  findAll() {
    return this.columnsService.findAll();
  }

  @Query(() => ColumnEntity, { name: 'column' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ColumnEntity> {
    return this.columnsService.findOne(id);
  }

  @Mutation(() => ColumnEntity)
  updateColumn(
    @Args('updateColumnInput') updateColumnInput: UpdateColumnInput,
  ) {
    return this.columnsService.update(updateColumnInput.id, updateColumnInput);
  }

  @Mutation(() => ColumnEntity)
  removeColumn(@Args('id', { type: () => Int }) id: number) {
    return this.columnsService.remove(id);
  }
}
