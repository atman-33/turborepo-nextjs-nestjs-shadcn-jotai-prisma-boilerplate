import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DummyUpdateManyMutationInput } from './dummy-update-many-mutation.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DummyWhereInput } from './dummy-where.input';

@ArgsType()
export class UpdateManyDummyArgs {

    @Field(() => DummyUpdateManyMutationInput, {nullable:false})
    @Type(() => DummyUpdateManyMutationInput)
    @ValidateNested()
    data!: DummyUpdateManyMutationInput;

    @Field(() => DummyWhereInput, {nullable:true})
    @Type(() => DummyWhereInput)
    @ValidateNested()
    where?: DummyWhereInput;
}
