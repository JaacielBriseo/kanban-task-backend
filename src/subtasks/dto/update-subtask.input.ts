import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateSubtaskInput } from './create-subtask.input';

@InputType()
export class UpdateSubtaskInput extends PartialType(CreateSubtaskInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  title?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
