import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class DummySumAggregateInput {

    @Field(() => Boolean, {nullable:true})
    int?: true;

    @Field(() => Boolean, {nullable:true})
    float?: true;
}
