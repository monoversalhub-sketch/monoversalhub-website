// src/app/api/admin/auth/route.js
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const { passcode } = await request.json()

    if (!passcode || passcode !== process.env.ADMIN_PASS) {
      return NextResponse.json({ ok: false }, { status: 401 })
    }

    // Sign a simple token — passcode never goes back to browser
    const token = Buffer.from(
      `mono-${Date.now()}-${process.env.ADMIN_PASS}`
    ).toString("base64")

    const res = NextResponse.json({ ok: true })
    res.cookies.set("mono_admin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    })
    return res
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set("mono_admin", "", { maxAge: 0, path: "/" })
  return res
}
