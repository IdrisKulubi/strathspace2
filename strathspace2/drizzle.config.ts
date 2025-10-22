import { cwd } from 'node:process'
import { loadEnvConfig } from '@next/env'

loadEnvConfig(cwd())

import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  schema: './app/db/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
})