import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = () => neon(process.env.DATABASE_URL)

export async function GET() {
  try {
    const rows = await sql()`SELECT COUNT(*)::int AS count FROM website_waitlist`
    return NextResponse.json({ count: rows[0].count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

export async function POST(request) {
  try {
    const { name, email, interest } = await request.json()
    if (!name || !email) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
    }
    await sql()`
      INSERT INTO website_waitlist (name, email, interest)
      VALUES (${name}, ${email}, ${interest || null})
    `
    return NextResponse.json({ ok: true })
  } catch (e) {
    // Unique constraint = already signed up
    if (e.message?.includes("unique") || e.message?.includes("duplicate")) {
      return NextResponse.json({ ok: true }) // treat as success silently
    }
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
