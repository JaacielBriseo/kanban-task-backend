import { Injectable } from '@nestjs/common';
import { CreateSubtaskInput } from './dto/create-subtask.input';
import { UpdateSubtaskInput } from './dto/update-subtask.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Subtask } from './entities/subtask.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtasksRepository: Repository<Subtask>,
  ) {}
  async create({ taskId, title }: CreateSubtaskInput): Promise<Subtask> {
    const newSubtask = this.subtasksRepository.create({
      title,
      task: { id: taskId },
    });

    return await this.subtasksRepository.save(newSubtask);
  }

  findAll() {
    return `This action returns all subtasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subtask`;
  }

  update(id: number, updateSubtaskInput: UpdateSubtaskInput) {
    return `This action updates a #${id} subtask`;
  }

  remove(id: number) {
    return `This action removes a #${id} subtask`;
  }
}
