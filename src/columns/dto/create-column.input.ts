import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateColumnInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
