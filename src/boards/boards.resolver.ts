import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

import { Board } from './entities/board.entity';
import { User } from '../users/entities/user.entity';
import { CreateBoardInput, UpdateBoardInput } from './dto';

import { BoardsService } from './boards.service';

@Resolver(() => Board)
@UseGuards(JwtAuthGuard)
export class BoardsResolver {
  constructor(private readonly boardsService: BoardsService) {}

  @Mutation(() => Board)
  async createBoard(
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
    @CurrentUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(createBoardInput, user);
  }

  @Query(() => [Board], { name: 'boards' })
  findAll(@CurrentUser() user: User): Promise<Board[]> {
    return this.boardsService.findAllBoardsByUser(user);
  }

  @Query(() => Board, { name: 'board' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Board> {
    return this.boardsService.findOneBoard(id, user);
  }

  @Mutation(() => Board)
  updateBoard(
    @Args('updateBoardInput') updateBoardInput: UpdateBoardInput,
    @CurrentUser() user: User,
  ): Promise<Board> {
    return this.boardsService.updateBoard(
      updateBoardInput.id,
      updateBoardInput,
      user,
    );
  }

  @Mutation(() => Board)
  removeBoard(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ): Promise<Board> {
    return this.boardsService.removeBoard(id, user);
  }
}
