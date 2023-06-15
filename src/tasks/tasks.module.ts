import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { SubtasksModule } from '../subtasks/subtasks.module';

@Module({
  providers: [TasksResolver, TasksService],
  imports: [TypeOrmModule.forFeature([Task]), SubtasksModule],
  exports: [TypeOrmModule],
})
export class TasksModule {}
