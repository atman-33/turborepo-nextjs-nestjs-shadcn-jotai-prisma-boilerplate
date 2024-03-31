import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@InputType()
export class DummyUpdateManyMutationInput {

    @Field(() => String, {nullable:true})
    text?: string;

    @Field(() => Int, {nullable:true})
    int?: number;

    @Field(() => Float, {nullable:true})
    float?: number;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
