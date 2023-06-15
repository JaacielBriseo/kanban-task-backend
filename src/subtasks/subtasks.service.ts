import { Injectable } from '@nestjs/common';
import { CreateSubtaskInput } from './dto/create-subtask.input';
import { UpdateSubtaskInput } from './dto/update-subtask.input';

@Injectable()
export class SubtasksService {
  create(createSubtaskInput: CreateSubtaskInput) {
    return 'This action adds a new subtask';
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
