import { CreateSubtaskInput } from './create-subtask.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubtaskInput extends PartialType(CreateSubtaskInput) {
  @Field(() => Int)
  id: number;
}
