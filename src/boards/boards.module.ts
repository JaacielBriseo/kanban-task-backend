import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsResolver } from './boards.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { ColumnsModule } from '../columns/columns.module';

@Module({
  providers: [BoardsResolver, BoardsService],
  imports: [TypeOrmModule.forFeature([Board]), ColumnsModule],
  exports: [TypeOrmModule],
})
export class BoardsModule {}
