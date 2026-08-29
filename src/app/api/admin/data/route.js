import { neon } from "@neondatabase/serverless"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

async function isAuthorized() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("mono_admin")?.value
    if (!token) return false
    const decoded = Buffer.from(token, "base64").toString()
    return decoded.startsWith("mono-") && decoded.includes(process.env.ADMIN_PASS)
  } catch {
    return false
  }
}

function db() {
  return neon(process.env.DATABASE_URL)
}

const ALLOWED_PATCH  = ["website_messages", "website_testimonials"]
const ALLOWED_DELETE = ["website_testimonials"]

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const sql = db()
    const [waitlist, messages, testimonials] = await Promise.all([
      sql`SELECT * FROM website_waitlist ORDER BY created_at DESC`,
      sql`SELECT * FROM website_messages ORDER BY created_at DESC`,
      sql`SELECT * FROM website_testimonials ORDER BY created_at DESC`,
    ])
    return NextResponse.json({ waitlist, messages, testimonials })
  } catch (e) {
    return NextResponse.json({ error: "Database error" }, { status: 500 })
  }
}

export async function PATCH(request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { table, id, data } = await request.json()
  if (!ALLOWED_PATCH.includes(table)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  if (!id || !data) {
    return NextResponse.json({ error: "Missing id or data" }, { status: 400 })
  }
  try {
    const sql = db()
    // Build SET clause dynamically from data keys
    const keys = Object.keys(data)
    const setClauses = keys.map((k, i) => `${k} = $${i + 2}`).join(", ")
    const values = [id, ...keys.map(k => data[k])]
    await sql(`UPDATE ${table} SET ${setClauses} WHERE id = $1`, values)
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const { table, id } = await request.json()
  if (!ALLOWED_DELETE.includes(table)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 })
  }
  try {
    const sql = db()
    await sql(`DELETE FROM ${table} WHERE id = $1`, [id])
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
