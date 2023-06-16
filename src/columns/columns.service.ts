import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ColumnEntity } from './entities/column.entity';
import { CreateColumnInput, UpdateColumnInput } from './dto';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columnsRepository: Repository<ColumnEntity>,
  ) {}

  async create({
    boardId,
    columnName,
  }: CreateColumnInput): Promise<ColumnEntity> {
    const newColumn = this.columnsRepository.create({
      columnName,
      board: { id: boardId },
    });

    return await this.columnsRepository.save(newColumn);
  }

  async findAll() {
    throw new Error('Find all columns not implemented ');
  }

  async findOne(id: string): Promise<ColumnEntity> {
    const column = await this.columnsRepository.findOneBy({ id });

    if (!column)
      throw new NotFoundException(`Column with id '${id}' not found`);
    return column;
  }

  async update(
    id: string,
    updateColumnInput: UpdateColumnInput,
  ): Promise<ColumnEntity> {
    await this.findOne(id);

    const board = await this.columnsRepository.preload(updateColumnInput);

    return await this.columnsRepository.save(board);
  }

  async remove(id: string): Promise<ColumnEntity> {
    const column = await this.findOne(id);

    await this.columnsRepository.remove(column);

    return { ...column, id };
  }
}
