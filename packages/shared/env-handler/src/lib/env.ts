import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

export const webEnv = {
  NEXT_PUBLIC_API_ENDPOINT: process.env['NEXT_PUBLIC_API_ENDPOINT'] as string | undefined,
  NEXT_PUBLIC_API_GQL_URL: process.env['NEXT_PUBLIC_API_GQL_URL'] as string | undefined
};

export const apiEnv = {
  API_PORT: Number(process.env['API_PORT']) as number | undefined,
  PRODUCTION_ORIGIN: process.env['PRODUCTION_ORIGIN'] as string | undefined,
  DATABASE_URL: process.env['DATABASE_URL'] as string | undefined
};

