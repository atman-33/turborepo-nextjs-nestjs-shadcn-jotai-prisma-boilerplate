import { GraphQLClient, RequestOptions } from 'graphql-request';
import { gql } from 'graphql-request';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<Scalars['DateTime']['input']>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']['input']>>;
};

export type Dummy = {
  __typename?: 'Dummy';
  createdAt: Scalars['DateTime']['output'];
  float?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  int?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type DummyAvgAggregate = {
  __typename?: 'DummyAvgAggregate';
  float?: Maybe<Scalars['Float']['output']>;
  int?: Maybe<Scalars['Float']['output']>;
};

export type DummyCountAggregate = {
  __typename?: 'DummyCountAggregate';
  _all: Scalars['Int']['output'];
  createdAt: Scalars['Int']['output'];
  float: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  int: Scalars['Int']['output'];
  text: Scalars['Int']['output'];
  updatedAt: Scalars['Int']['output'];
};

export type DummyCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  float?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  int?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DummyMaxAggregate = {
  __typename?: 'DummyMaxAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  float?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  int?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DummyMinAggregate = {
  __typename?: 'DummyMinAggregate';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  float?: Maybe<Scalars['Float']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  int?: Maybe<Scalars['Int']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type DummySumAggregate = {
  __typename?: 'DummySumAggregate';
  float?: Maybe<Scalars['Float']['output']>;
  int?: Maybe<Scalars['Int']['output']>;
};

export type DummyUpdateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']['input']>;
  float?: InputMaybe<Scalars['Float']['input']>;
  int?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  updatedAt?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DummyWhereInput = {
  AND?: InputMaybe<Array<DummyWhereInput>>;
  NOT?: InputMaybe<Array<DummyWhereInput>>;
  OR?: InputMaybe<Array<DummyWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  float?: InputMaybe<FloatFilter>;
  id?: InputMaybe<StringFilter>;
  int?: InputMaybe<IntFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DummyWhereUniqueInput = {
  AND?: InputMaybe<Array<DummyWhereInput>>;
  NOT?: InputMaybe<Array<DummyWhereInput>>;
  OR?: InputMaybe<Array<DummyWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  float?: InputMaybe<FloatFilter>;
  id?: InputMaybe<Scalars['String']['input']>;
  int?: InputMaybe<IntFilter>;
  text?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  in?: InputMaybe<Array<Scalars['Float']['input']>>;
  isSet?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  not?: InputMaybe<FloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']['input']>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<Scalars['Int']['input']>>;
  isSet?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createDummy: Dummy;
  deleteDummy: Dummy;
  updateDummy: Dummy;
};


export type MutationCreateDummyArgs = {
  data?: InputMaybe<DummyCreateInput>;
};


export type MutationDeleteDummyArgs = {
  where: DummyWhereUniqueInput;
};


export type MutationUpdateDummyArgs = {
  data: DummyUpdateInput;
  where: DummyWhereUniqueInput;
};

export type Query = {
  __typename?: 'Query';
  dummies: Array<Dummy>;
  dummy: Dummy;
};


export type QueryDummyArgs = {
  where: DummyWhereUniqueInput;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  gt?: InputMaybe<Scalars['String']['input']>;
  gte?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  isSet?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['String']['input']>;
  lte?: InputMaybe<Scalars['String']['input']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<StringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']['input']>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type GetDummiesVariables = Exact<{ [key: string]: never; }>;


export type GetDummies = { __typename?: 'Query', dummies: Array<{ __typename?: 'Dummy', id: string, text?: string | null, int?: number | null, createdAt: any, updatedAt: any }> };

export type CreateDummyVariables = Exact<{
  data: DummyCreateInput;
}>;


export type CreateDummy = { __typename?: 'Mutation', createDummy: { __typename?: 'Dummy', id: string, text?: string | null, int?: number | null, createdAt: any, updatedAt: any } };

export type UpdateDummyVariables = Exact<{
  data: DummyUpdateInput;
  where: DummyWhereUniqueInput;
}>;


export type UpdateDummy = { __typename?: 'Mutation', updateDummy: { __typename?: 'Dummy', id: string, text?: string | null, int?: number | null, createdAt: any, updatedAt: any } };

export type DeleteDummyVariables = Exact<{
  where: DummyWhereUniqueInput;
}>;


export type DeleteDummy = { __typename?: 'Mutation', deleteDummy: { __typename?: 'Dummy', id: string } };

export type QueryExampleVariables = Exact<{ [key: string]: never; }>;


export type QueryExample = { __typename?: 'Query', dummies: Array<{ __typename?: 'Dummy', id: string, text?: string | null, createdAt: any, updatedAt: any }> };


export const GetDummiesDocument = /*#__PURE__*/ gql`
    query getDummies {
  dummies {
    id
    text
    int
    createdAt
    updatedAt
  }
}
    `;
export const CreateDummyDocument = /*#__PURE__*/ gql`
    mutation createDummy($data: DummyCreateInput!) {
  createDummy(data: $data) {
    id
    text
    int
    createdAt
    updatedAt
  }
}
    `;
export const UpdateDummyDocument = /*#__PURE__*/ gql`
    mutation updateDummy($data: DummyUpdateInput!, $where: DummyWhereUniqueInput!) {
  updateDummy(data: $data, where: $where) {
    id
    text
    int
    createdAt
    updatedAt
  }
}
    `;
export const DeleteDummyDocument = /*#__PURE__*/ gql`
    mutation deleteDummy($where: DummyWhereUniqueInput!) {
  deleteDummy(where: $where) {
    id
  }
}
    `;
export const QueryExampleDocument = /*#__PURE__*/ gql`
    query queryExample {
  dummies {
    id
    text
    createdAt
    updatedAt
  }
}
    `;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    getDummies(variables?: GetDummiesVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<GetDummies> {
      return withWrapper((wrappedRequestHeaders) => client.request<GetDummies>(GetDummiesDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'getDummies', 'query', variables);
    },
    createDummy(variables: CreateDummyVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateDummy> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateDummy>(CreateDummyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'createDummy', 'mutation', variables);
    },
    updateDummy(variables: UpdateDummyVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateDummy> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateDummy>(UpdateDummyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateDummy', 'mutation', variables);
    },
    deleteDummy(variables: DeleteDummyVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<DeleteDummy> {
      return withWrapper((wrappedRequestHeaders) => client.request<DeleteDummy>(DeleteDummyDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'deleteDummy', 'mutation', variables);
    },
    queryExample(variables?: QueryExampleVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<QueryExample> {
      return withWrapper((wrappedRequestHeaders) => client.request<QueryExample>(QueryExampleDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'queryExample', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;