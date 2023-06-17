import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Subtask[]> {
    throw new Error('Find all subtasks not implemented');
  }

  async findOne(id: string): Promise<Subtask> {
    const subtask = await this.subtasksRepository.findOneBy({ id });

    if (!subtask)
      throw new NotFoundException(`Subtask with id '${id}' not found`);

    return subtask;
  }

  async update(
    id: string,
    updateSubtaskInput: UpdateSubtaskInput,
  ): Promise<Subtask> {
    await this.findOne(id);

    const subtask = await this.subtasksRepository.preload(updateSubtaskInput);

    return await this.subtasksRepository.save(subtask);
  }

  async remove(id: string): Promise<Subtask> {
    const subtask = await this.findOne(id);

    await this.subtasksRepository.remove(subtask);
    return { ...subtask, id };
  }
}
