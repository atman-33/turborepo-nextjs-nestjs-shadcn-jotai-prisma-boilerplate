import { webEnv } from '@/config';
import { getGraphqlClient } from '@repo/data-access-graphql';

if (!webEnv.api.gqlUrl) {
  throw new Error('env: NEXT_PUBLIC_API_GQL_URL is not defined');
}

export const gql: ReturnType<typeof getGraphqlClient> = getGraphqlClient(webEnv.api.gqlUrl);