import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class DummyAvgOrderByAggregateInput {

    @Field(() => SortOrder, {nullable:true})
    int?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    float?: keyof typeof SortOrder;
}
