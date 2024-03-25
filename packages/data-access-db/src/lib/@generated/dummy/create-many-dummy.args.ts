import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DummyCreateManyInput } from './dummy-create-many.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class CreateManyDummyArgs {

    @Field(() => [DummyCreateManyInput], {nullable:false})
    @Type(() => DummyCreateManyInput)
    @ValidateNested()
    data!: Array<DummyCreateManyInput>;
}
