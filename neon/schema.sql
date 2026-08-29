-- Monoversal Hub Website — Neon Schema
-- Run this in your Neon SQL editor to set up the 3 tables

CREATE TABLE IF NOT EXISTS website_waitlist (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  interest   TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS website_messages (
  id         SERIAL PRIMARY KEY,
  fname      TEXT NOT NULL,
  lname      TEXT,
  email      TEXT NOT NULL,
  subject    TEXT,
  message    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS website_testimonials (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  role       TEXT,
  text       TEXT NOT NULL,
  approved   BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_waitlist_email        ON website_waitlist (email);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON website_testimonials (approved, created_at DESC);
