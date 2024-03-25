import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { FloatFilter } from '../prisma/float-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class DummyWhereInput {

    @Field(() => [DummyWhereInput], {nullable:true})
    AND?: Array<DummyWhereInput>;

    @Field(() => [DummyWhereInput], {nullable:true})
    OR?: Array<DummyWhereInput>;

    @Field(() => [DummyWhereInput], {nullable:true})
    NOT?: Array<DummyWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    text?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    int?: IntFilter;

    @Field(() => FloatFilter, {nullable:true})
    float?: FloatFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}
