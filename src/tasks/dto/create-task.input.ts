import { InputType, Field, ID } from '@nestjs/graphql';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateTaskInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => ID)
  @IsUUID()
  columnId: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  @IsArray()
  subtasksTitles?: string[];
}
