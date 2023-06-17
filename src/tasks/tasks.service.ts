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
    throw new Error('Find all tasks not implemented');
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id },
    });

    if (!task) throw new NotFoundException(`Task with id '${id}' not found`);

    return task;
  }

  async update(id: string, { columnId, ...rest }: UpdateTaskInput) {
    const queryBuilder = this.tasksRepository
      .createQueryBuilder()
      .update()
      .set(rest)
      .where('id = :id', { id });

    if (columnId) queryBuilder.set({ column: { id: columnId } });

    await queryBuilder.execute();
    return this.findOne(id);
  }

  async remove(id: string): Promise<Task> {
    const task = await this.findOne(id);

    await this.tasksRepository.remove(task);
    return { ...task, id };
  }
}
