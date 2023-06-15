import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnInput } from './dto/create-column.input';
import { UpdateColumnInput } from './dto/update-column.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';
import { Repository } from 'typeorm';

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
    return `This action returns all columns`;
  }

  async findOne(id: string): Promise<ColumnEntity> {
    const column = await this.columnsRepository.findOneBy({ id });

    if (!column)
      throw new NotFoundException(`Column with id '${id}' not found`);
    return column;
  }

  async update(id: number, updateColumnInput: UpdateColumnInput) {
    return `This action updates a #${id} column`;
  }

  async remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
