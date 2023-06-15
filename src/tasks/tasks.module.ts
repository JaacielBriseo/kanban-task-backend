import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';

import { SubtasksModule } from '../subtasks/subtasks.module';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  providers: [TasksResolver, TasksService],
  imports: [TypeOrmModule.forFeature([Task]), SubtasksModule, ColumnsModule],
  exports: [TypeOrmModule],
})
export class TasksModule {}
