import { registerEnumType } from '@nestjs/graphql';

export enum DummyScalarFieldEnum {
    id = "id",
    text = "text",
    int = "int",
    float = "float",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(DummyScalarFieldEnum, { name: 'DummyScalarFieldEnum', description: undefined })
