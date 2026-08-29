// scripts/run-migrations.js
// Simple migration runner that executes SQL files in neon/migrations/
// Usage: DATABASE_URL="postgresql://..." node scripts/run-migrations.js

import fs from 'fs'
import path from 'path'
import { Client } from '@neondatabase/serverless'

async function run() {
  const conn = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL
  if (!conn) {
    console.error('No DATABASE_URL or NEON_DATABASE_URL found in env.');
    process.exit(1)
  }

  const client = new Client({ connectionString: conn })
  await client.connect()

  const migrationsDir = path.join(process.cwd(), 'neon', 'migrations')
  if (!fs.existsSync(migrationsDir)) {
    console.error('No migrations directory found:', migrationsDir)
    process.exit(1)
  }

  const files = fs.readdirSync(migrationsDir).filter(f => f.endsWith('.sql')).sort()
  for (const f of files) {
    const full = path.join(migrationsDir, f)
    console.log('Running migration:', f)
    const sql = fs.readFileSync(full, 'utf8')
    try {
      await client.query(sql)
      console.log('Success:', f)
    } catch (err) {
      console.error('Migration failed:', f, err.message || err)
      await client.end()
      process.exit(1)
    }
  }

  await client.end()
  console.log('All migrations applied.')
}

run().catch(err => { console.error(err); process.exit(1) })
