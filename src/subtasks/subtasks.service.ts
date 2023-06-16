import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubtaskInput, UpdateSubtaskInput } from './dto';
import { Subtask } from './entities/subtask.entity';

@Injectable()
export class SubtasksService {
  constructor(
    @InjectRepository(Subtask)
    private readonly subtasksRepository: Repository<Subtask>,
  ) {}
  async create({
    taskId,
    title,
    isCompleted,
  }: CreateSubtaskInput): Promise<Subtask> {
    const newSubtask = this.subtasksRepository.create({
      title,
      isCompleted,
      task: { id: taskId },
    });

    return await this.subtasksRepository.save(newSubtask);
  }

  async findAll() {
    return `This action returns all subtasks`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} subtask`;
  }

  async update(id: number, updateSubtaskInput: UpdateSubtaskInput) {
    return `This action updates a #${id} subtask`;
  }

  async remove(id: number) {
    return `This action removes a #${id} subtask`;
  }
}
