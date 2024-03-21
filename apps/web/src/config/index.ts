export const webEnv = {
  api: {
    endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT as string,
    gqlUrl: process.env.NEXT_PUBLIC_GQL_URL as string,
  },
};