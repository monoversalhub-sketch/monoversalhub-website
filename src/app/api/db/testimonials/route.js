import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = () => neon(process.env.DATABASE_URL)

export async function GET() {
  try {
    const rows = await sql()`
      SELECT name, role, text, created_at
      FROM website_testimonials
      WHERE approved = true
      ORDER BY created_at DESC
      LIMIT 6
    `
    return NextResponse.json(rows)
  } catch {
    return NextResponse.json([])
  }
}

export async function POST(request) {
  try {
    const { name, role, text } = await request.json()
    if (!name || !text) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
    }
    await sql()`
      INSERT INTO website_testimonials (name, role, text, approved)
      VALUES (${name}, ${role || null}, ${text}, false)
    `
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
