import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class DummyAvgAggregate {

    @Field(() => Float, {nullable:true})
    int?: number;

    @Field(() => Float, {nullable:true})
    float?: number;
}
