import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { BoardsModule } from 'src/boards/boards.module';
import { ColumnsModule } from 'src/columns/columns.module';
import { TasksModule } from 'src/tasks/tasks.module';
import { SubtasksModule } from 'src/subtasks/subtasks.module';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [
    ConfigModule,
    UsersModule,
    BoardsModule,
    ColumnsModule,
    TasksModule,
    SubtasksModule,
  ],
})
export class SeedModule {}
