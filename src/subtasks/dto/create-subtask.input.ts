import { InputType, Field, ID } from '@nestjs/graphql';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateSubtaskInput {
  @Field(() => ID)
  @IsUUID()
  taskId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => Boolean)
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean = false;
}
