import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskInput, UpdateTaskInput } from './dto';
import { Task } from './entities/task.entity';

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

  async findAll() {
    return `This action returns all tasks`;
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });

    if (!task) throw new NotFoundException(`Task with id '${id}' not found`);

    return task;
  }

  async update(id: number, updateTaskInput: UpdateTaskInput) {
    return `This action updates a #${id} task`;
  }

  async remove(id: string): Promise<Task> {
    const task = await this.findOne(id);

    await this.tasksRepository.remove(task);
    return { ...task, id };
  }
}
