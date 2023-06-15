import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all columns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} column`;
  }

  update(id: number, updateColumnInput: UpdateColumnInput) {
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
