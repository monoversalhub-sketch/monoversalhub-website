# Monoversal Hub Website v3.0 — Neon Edition

Next.js 16 marketing/waitlist site for Monoversal Hub. Database migrated from Supabase to **Neon (serverless PostgreSQL)**.

## Stack
- **Framework:** Next.js 16 (App Router)
- **Database:** Neon (serverless Postgres) via `@neondatabase/serverless`
- **Hosting:** Vercel

## Architecture

All database access goes through Next.js API routes — no DB credentials ever reach the browser.

```
Browser → /api/db/waitlist       → Neon
Browser → /api/db/messages       → Neon
Browser → /api/db/testimonials   → Neon
Browser → /api/admin/data        → Neon (admin only, cookie-protected)
Browser → /api/admin/auth        → sets httpOnly cookie
```

## Setup

### 1. Create Neon database
1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project → copy the **connection string**
3. Open the SQL editor and run `neon/schema.sql`

### 2. Environment variables
Copy `.env.example` to `.env.local` and fill in:

```env
DATABASE_URL=postgresql://user:pass@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
ADMIN_PASS=your_strong_admin_passcode
```

### 3. Install & run
```bash
npm install
npm run dev
```

### 4. Deploy to Vercel
```bash
vercel --prod
```
Add `DATABASE_URL` and `ADMIN_PASS` in Vercel → Project → Environment Variables.

## Migrating existing data from Supabase

In your **Supabase** dashboard → SQL Editor, run:
```sql
-- Export data (copy output to Neon SQL editor)
SELECT 'INSERT INTO website_waitlist (name, email, interest, created_at) VALUES (''' || name || ''', ''' || email || ''', ' || COALESCE('''' || interest || '''', 'NULL') || ', ''' || created_at || ''');'
FROM website_waitlist;

SELECT 'INSERT INTO website_messages (fname, lname, email, subject, message, created_at) VALUES (''' || fname || ''', ' || COALESCE('''' || lname || '''', 'NULL') || ', ''' || email || ''', ' || COALESCE('''' || subject || '''', 'NULL') || ', ''' || replace(message, '''', '''''') || ''', ''' || created_at || ''');'
FROM website_messages;

SELECT 'INSERT INTO website_testimonials (name, role, text, approved, created_at) VALUES (''' || name || ''', ' || COALESCE('''' || role || '''', 'NULL') || ', ''' || replace(text, '''', '''''') || ''', ' || approved || ', ''' || created_at || ''');'
FROM website_testimonials;
```

## API Routes

| Route | Method | Description |
|---|---|---|
| `/api/db/waitlist` | GET | Returns `{ count }` |
| `/api/db/waitlist` | POST | `{ name, email, interest }` |
| `/api/db/messages` | GET | Returns `{ count }` |
| `/api/db/messages` | POST | `{ fname, lname, email, subject, message }` |
| `/api/db/testimonials` | GET | Returns approved testimonials array |
| `/api/db/testimonials` | POST | `{ name, role, text }` (approved=false) |
| `/api/admin/auth` | POST | `{ passcode }` → sets cookie |
| `/api/admin/auth` | DELETE | Clears cookie |
| `/api/admin/data` | GET | All rows from all 3 tables |
| `/api/admin/data` | PATCH | `{ table, id, data }` |
| `/api/admin/data` | DELETE | `{ table, id }` |
