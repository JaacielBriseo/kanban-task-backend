import { Injectable } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubtasksService } from '../subtasks/subtasks.service';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    private readonly subtasksService: SubtasksService,
    private readonly columnsService: ColumnsService,
  ) {}

  async create({
    columnId,
    description,
    title,
    subtasksTitles,
  }: CreateTaskInput): Promise<Task> {
    const parentColumn = await this.columnsService.findOne(columnId);
    const newTask = this.tasksRepository.create({
      description,
      title,
      column: { id: columnId },
      status: parentColumn.columnName,
    });
    const savedTask = await this.tasksRepository.save(newTask);

    if (subtasksTitles && subtasksTitles.length > 0) {
      const subtasksPromises = subtasksTitles.map((subtaskTitle) =>
        this.subtasksService.create({
          title: subtaskTitle,
          taskId: savedTask.id,
        }),
      );

      await Promise.all(subtasksPromises);
    }

    return savedTask;
  }

  findAll() {
    return `This action returns all tasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
