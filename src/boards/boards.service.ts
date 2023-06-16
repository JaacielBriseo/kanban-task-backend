import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Board } from './entities/board.entity';
import { CreateBoardInput, UpdateBoardInput } from './dto';

import { User } from '../users/entities/user.entity';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class BoardsService {
  private logger = new Logger('BoardsService');

  constructor(
    @InjectRepository(Board)
    private readonly boardsRepository: Repository<Board>,
    private readonly columnsService: ColumnsService,
  ) {}

  async createBoard(
    { boardName, columnsNames }: CreateBoardInput,
    user: User,
  ): Promise<Board> {
    try {
      const newBoard = this.boardsRepository.create({
        boardName,
        user,
      });
      const savedBoard = await this.boardsRepository.save(newBoard);

      if (columnsNames && columnsNames.length > 0) {
        const columnsPromises = columnsNames.map((columnName) =>
          this.columnsService.create({ columnName, boardId: savedBoard.id }),
        );

        await Promise.all(columnsPromises);
      }

      return savedBoard;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAllBoardsByUser(user: User): Promise<Board[]> {
    return await this.boardsRepository.find({
      where: { user: { id: user.id } },
    });
  }

  async findOneBoard(id: string, user: User): Promise<Board> {
    const board = await this.boardsRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    if (!board) throw new NotFoundException(`Board with id '${id}' not found`);

    return board;
  }

  async updateBoard(
    id: string,
    updateBoardInput: UpdateBoardInput,
    user: User,
  ): Promise<Board> {
    await this.findOneBoard(id, user);

    const board = await this.boardsRepository.preload(updateBoardInput);

    return await this.boardsRepository.save(board);
  }

  async removeBoard(id: string, user: User): Promise<Board> {
    const board = await this.findOneBoard(id, user);

    await this.boardsRepository.remove(board);
    return { ...board, id };
  }

  private handleDBErrors(error: any): never {
    switch (error.code) {
      case 'repeated-board-name':
        throw new BadRequestException(error.detail);
      default:
        this.logger.error(error);
        throw new InternalServerErrorException('Please check server logs');
    }
  }
}
