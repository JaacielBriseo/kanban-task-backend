import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateBoardInput } from './create-board.input';

@InputType()
export class UpdateBoardInput extends PartialType(CreateBoardInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
