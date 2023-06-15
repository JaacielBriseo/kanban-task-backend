import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateSubtaskInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
