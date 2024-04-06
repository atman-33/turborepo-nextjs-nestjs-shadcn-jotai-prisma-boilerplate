import { webEnv } from '@/config/web-env';
import { getGraphqlClient } from '@repo/data-access-graphql';

if (!webEnv.NEXT_PUBLIC_API_GQL_URL) {
  throw new Error('env: NEXT_PUBLIC_API_GQL_URL is not defined');
}

export const gql: ReturnType<typeof getGraphqlClient> = getGraphqlClient(
  webEnv.NEXT_PUBLIC_API_GQL_URL,
);
