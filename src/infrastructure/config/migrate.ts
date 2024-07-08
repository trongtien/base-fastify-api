import * as dotenv from 'dotenv';
import path from 'path';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

async function onLoadMirage(): Promise<void> {
  dotenv.config();

  const pool = new Pool({
    connectionString: `postgresql://${process.env.USER_POSTGRES}:${process.env.PASSWORD_POSTGRES}@${process.env.HOST_POSTGRES}:${process.env.PORT_POSTGRES}/${process.env.DATABASE_POSTGRES}`,
    ssl: false,
  });

  const db = drizzle(pool);

  await migrate(db, {
    migrationsFolder: path.resolve(process.cwd(), './migrations'),
    migrationsSchema: process.env.SCHEMA_POSTGRES,
  })
    .then(() => console.log('Migrate success'))
    .catch((error) => console.log(`Migrate error: ${error} with env schema ${process.env.SCHEMA_POSTGRES}`));
}

onLoadMirage();
