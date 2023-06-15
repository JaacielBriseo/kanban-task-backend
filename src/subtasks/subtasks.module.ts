import { Module } from '@nestjs/common';
import { SubtasksService } from './subtasks.service';
import { SubtasksResolver } from './subtasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtask } from './entities/subtask.entity';

@Module({
  providers: [SubtasksResolver, SubtasksService],
  imports: [TypeOrmModule.forFeature([Subtask])],
  exports: [TypeOrmModule],
})
export class SubtasksModule {}
