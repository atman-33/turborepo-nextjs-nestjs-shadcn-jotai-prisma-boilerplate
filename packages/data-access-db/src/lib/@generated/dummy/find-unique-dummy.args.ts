import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { DummyWhereUniqueInput } from './dummy-where-unique.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class FindUniqueDummyArgs {

    @Field(() => DummyWhereUniqueInput, {nullable:false})
    @Type(() => DummyWhereUniqueInput)
    @ValidateNested()
    where!: Prisma.AtLeast<DummyWhereUniqueInput, 'id'>;
}
