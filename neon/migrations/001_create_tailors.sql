-- neon/migrations/001_create_tailors.sql

-- Migration: create tailors table for public portfolio pages
-- Run this in your Neon SQL editor or with the provided migration script.

CREATE TABLE IF NOT EXISTS tailors (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  city TEXT,
  craft TEXT,
  whatsapp_number TEXT,
  boss_score INTEGER,
  portfolio_public BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tailors_slug ON tailors(slug);
CREATE INDEX IF NOT EXISTS idx_tailors_portfolio_public ON tailors(portfolio_public);
