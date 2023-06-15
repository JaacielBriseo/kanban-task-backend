import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateColumnInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  columnName: string;

  @Field(() => ID)
  @IsUUID()
  boardId: string;
}
