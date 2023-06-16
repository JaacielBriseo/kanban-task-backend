import { ParseUUIDPipe } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ColumnEntity } from './entities/column.entity';
import { ColumnsService } from './columns.service';
import { CreateColumnInput, UpdateColumnInput } from './dto';

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
  async findAll() {
    return this.columnsService.findAll();
  }

  @Query(() => ColumnEntity, { name: 'column' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ColumnEntity> {
    return this.columnsService.findOne(id);
  }

  @Mutation(() => ColumnEntity)
  async updateColumn(
    @Args('updateColumnInput') updateColumnInput: UpdateColumnInput,
  ) {
    return this.columnsService.update(updateColumnInput.id, updateColumnInput);
  }

  @Mutation(() => ColumnEntity)
  async removeColumn(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
  ): Promise<ColumnEntity> {
    return this.columnsService.remove(id);
  }
}
