import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"

const sql = () => neon(process.env.DATABASE_URL)

export async function GET() {
  try {
    const rows = await sql()`SELECT COUNT(*)::int AS count FROM website_messages`
    return NextResponse.json({ count: rows[0].count })
  } catch {
    return NextResponse.json({ count: 0 })
  }
}

export async function POST(request) {
  try {
    const { fname, lname, email, subject, message } = await request.json()
    if (!fname || !email || !message) {
      return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
    }
    await sql()`
      INSERT INTO website_messages (fname, lname, email, subject, message)
      VALUES (${fname}, ${lname || null}, ${email}, ${subject || null}, ${message})
    `
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
