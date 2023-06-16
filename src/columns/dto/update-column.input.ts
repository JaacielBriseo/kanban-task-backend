import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';
import { CreateColumnInput } from './create-column.input';

@InputType()
export class UpdateColumnInput extends PartialType(CreateColumnInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
