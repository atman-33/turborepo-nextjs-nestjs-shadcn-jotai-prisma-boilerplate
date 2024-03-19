import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { DummyCreateInput } from './dummy-create.input';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

@ArgsType()
export class CreateOneDummyArgs {

    @Field(() => DummyCreateInput, {nullable:true})
    @Type(() => DummyCreateInput)
    @ValidateNested()
    data?: DummyCreateInput;
}
