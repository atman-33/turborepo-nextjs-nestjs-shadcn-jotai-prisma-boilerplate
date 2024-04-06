export const apiEnv = {
  API_PORT: Number(process.env['API_PORT']) as number,
  WEB_ORIGIN: process.env['WEB_ORIGIN'] as string,
  DATABASE_URL: process.env['DATABASE_URL'] as string,
};
