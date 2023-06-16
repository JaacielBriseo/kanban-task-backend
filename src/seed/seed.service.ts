import { ConfigService } from '@nestjs/config';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { BoardsService } from '../boards/boards.service';
import { ColumnsService } from '../columns/columns.service';
import { TasksService } from '../tasks/tasks.service';
import { SubtasksService } from '../subtasks/subtasks.service';

import { User } from '../users/entities/user.entity';
import { Board } from '../boards/entities/board.entity';
import { Task } from '../tasks/entities/task.entity';
import { ColumnEntity } from '../columns/entities/column.entity';
import { Subtask } from '../subtasks/entities/subtask.entity';

import { SeedResponse } from './types';
import {
  SEED_BOARDS,
  SEED_COLUMNS,
  SEED_SUBTASKS,
  SEED_TASKS,
  SEED_USER,
} from './data/seed-data';

@Injectable()
export class SeedService {
  private logger = new Logger('SeedService');
  private isProd: boolean;
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly boardsService: BoardsService,
    private readonly columnsService: ColumnsService,
    private readonly tasksService: TasksService,
    private readonly subtasksService: SubtasksService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
    @InjectRepository(ColumnEntity)
    private readonly columnsRepository: Repository<ColumnEntity>,
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(Subtask)
    private readonly subtasksRepository: Repository<Subtask>,
  ) {
    this.isProd = configService.get('STATE') === 'prod';
  }

  async executeSeed(): Promise<SeedResponse> {
    //* Prevent running SEED on production
    //? Reason: Seeding DB deletes users and boards that already exists
    if (this.isProd) {
      throw new UnauthorizedException('Cannot execute seed on production');
    }
    this.logger.log('Seeding DB...');
    //* Clean DB
    await this.deleteDatabase();

    //* Seed DB
    /** User */
    const user = await this.loadUser();
    /** Boards */
    const boards = await this.loadBoards(user);
    /** Columns */
    const columns = await this.loadColumns(boards);
    /** Tasks */
    const tasks = await this.loadTasks(columns);
    /** Subtasks */
    await this.loadSubtasks(tasks);

    this.logger.log('DB Seeded!');
    return {
      msg: 'Seed executed',
      ok: true,
    };
  }

  private async deleteDatabase() {
    await this.subtasksRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    await this.tasksRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    await this.columnsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    await this.boardsRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
    await this.usersRepository
      .createQueryBuilder()
      .delete()
      .where({})
      .execute();
  }

  private async loadUser(): Promise<User> {
    return await this.usersService.create(SEED_USER[0]);
  }

  private async loadBoards(user: User) {
    const boardsPromises = [];

    for (const board of SEED_BOARDS) {
      boardsPromises.push(this.boardsService.createBoard(board, user));
    }
    return await Promise.all(boardsPromises);
  }

  private async loadColumns(boards: Board[]) {
    const columnsPromises = [];

    for (const column of SEED_COLUMNS) {
      for (const board of boards) {
        columnsPromises.push(
          this.columnsService.create({
            columnName: column.columnName,
            boardId: board.id,
          }),
        );
      }
    }
    return await Promise.all(columnsPromises);
  }

  private async loadTasks(columns: ColumnEntity[]) {
    const tasksPromises = [];
    const numColumns = columns.length;
    const numTasks = SEED_TASKS.length;

    for (let i = 0; i < numTasks; i++) {
      const task = SEED_TASKS[i];
      const column = columns[i % numColumns]; // Distribute tasks among columns cyclically

      tasksPromises.push(
        this.tasksService.create({ columnId: column.id, ...task }),
      );
    }
    return await Promise.all(tasksPromises);
  }

  private async loadSubtasks(tasks: Task[]) {
    const subtasksPromises = [];
    const numTasks = tasks.length;
    const numSubtasks = SEED_SUBTASKS.length;

    for (let i = 0; i < numSubtasks; i++) {
      const subtask = SEED_SUBTASKS[i];
      const task = tasks[i % numTasks];

      subtasksPromises.push(
        this.subtasksService.create({ taskId: task.id, ...subtask }),
      );
    }
    await Promise.all(subtasksPromises);
  }
}
