import { InputType, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

@InputType()
export class CreateSubtaskInput {
  @Field(() => ID)
  @IsUUID()
  taskId: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;
}
