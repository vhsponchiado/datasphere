import * as dotenv from 'dotenv'
import * as dotenvExpand from 'dotenv-expand'
import { z } from 'zod'

const myEnv = dotenv.config()
dotenvExpand.expand(myEnv)

const DEFAULT_PORT = 3000;

export const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.coerce.number().default(DEFAULT_PORT),

    POSTGRES_DB: z.string().min(1, "POSTGRES_DB é obrigatório"),
    POSTGRES_PORT: z.coerce.number().default(5432),
    POSTGRES_USER: z.string().min(1, "POSTGRES_USER é obrigatório"),
    POSTGRES_PASSWORD: z.string().min(1, "POSTGRES_PASSWORD é obrigatório"),
    POSTGRES_HOST: z.string().min(1, "POSTGRES_HOST é obrigatório"),
    POSTGRES_SSL: z.string().default("false"),

    JWT_SECRET: z.string().min(1, "JWT_SECRET é obrigatório"),
    JWT_REFRESH_SECRET: z.string().min(1, "JWT_REFRESH_SECRET é obrigatório"),
    JWT_EXPIRES_IN: z.string().default("15m"),
    JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  });

export type Env = z.infer<typeof envSchema>;