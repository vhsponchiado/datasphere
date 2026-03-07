import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import { defineConfig } from 'drizzle-kit'

const myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

const sslEnabled = process.env.POSTGRES_SSL?.toLowerCase() === 'true';
const sslConfig = sslEnabled
    ? {
        rejectUnauthorized: false,
    }
    : undefined;

const database = process.env.POSTGRES_DB!
const port = Number.parseInt(process.env.POSTGRES_PORT || '5432', 10)
const user = process.env.POSTGRES_USER!
const password = process.env.POSTGRES_PASSWORD!
const host = process.env.POSTGRES_HOST!

export default defineConfig({
    schema: './src/infrastructure/db/postgres/drizzle.schema.ts',
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        host,
        port,
        user,
        password,
        database,
        ssl: sslConfig,
    },
})