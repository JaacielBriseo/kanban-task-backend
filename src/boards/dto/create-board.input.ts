import { InputType, Field } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  boardName: string;

  @Field(() => [String], { nullable: true })
  @IsArray()
  @IsOptional()
  columnsNames?: string[];
}
