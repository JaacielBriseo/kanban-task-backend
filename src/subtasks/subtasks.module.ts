import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubtasksService } from './subtasks.service';
import { SubtasksResolver } from './subtasks.resolver';
import { Subtask } from './entities/subtask.entity';

@Module({
  providers: [SubtasksResolver, SubtasksService],
  imports: [TypeOrmModule.forFeature([Subtask])],
  exports: [TypeOrmModule, SubtasksService],
})
export class SubtasksModule {}
