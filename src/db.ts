import { Elysia } from 'elysia'
import postgres from 'postgres'

// ponytail: postgres.js has no `min` pool option; connections grow lazily to `max`.
const sql = postgres({
  hostname: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: Number(process.env.DATABASE_MAX_POOL_SIZE),
})

export const db = new Elysia({ name: 'db' }).decorate('sql', sql).onStop(() => sql.end())
