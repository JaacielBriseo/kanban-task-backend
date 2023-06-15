import { Module } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { ColumnsResolver } from './columns.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './entities/column.entity';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  providers: [ColumnsResolver, ColumnsService],
  imports: [TypeOrmModule.forFeature([ColumnEntity]), TasksModule],
  exports: [TypeOrmModule],
})
export class ColumnsModule {}
