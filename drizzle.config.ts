import { defineConfig } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config({});
const getConnection = () => {
  const port = process.env.PORT_POSTGRES;
  const user = process.env.USER_POSTGRES;
  const password = process.env.PASSWORD_POSTGRES;
  const dbName = process.env.DATABASE_POSTGRES;
  const host = process.env.HOST_POSTGRES;

  return `postgresql://${user}:${password}@${host}:${port}/${dbName}`;
};

const getSchema = (): string => {
  const schema = process.env.SCHEMA_POSTGRES;
  return schema ? schema : 'public';
};

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/models/*.model.ts',
  out: './migrations',
  dbCredentials: {
    url: getConnection(),
  },
  migrations: {
    table: 'migrations',
    schema: getSchema(),
  },
});
