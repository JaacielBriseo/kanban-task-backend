import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnsService } from './columns.service';
import { ColumnsResolver } from './columns.resolver';
import { ColumnEntity } from './entities/column.entity';

@Module({
  providers: [ColumnsResolver, ColumnsService],
  imports: [TypeOrmModule.forFeature([ColumnEntity])],
  exports: [TypeOrmModule, ColumnsService],
})
export class ColumnsModule {}
