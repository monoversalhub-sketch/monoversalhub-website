"use client"

import { useEffect, useRef } from "react"

/**
 * Renders a raw HTML string (which may contain <style> and <script> tags)
 * into the DOM on the client.
 *
 * Why this exists: `dangerouslySetInnerHTML` will insert <script> tags into
 * the DOM, but the browser does NOT execute scripts inserted that way — it's
 * a security restriction. To make inline/legacy scripts actually run, we
 * find every <script> tag after mount and replace it with a freshly created
 * <script> element, which the browser *does* execute.
 */
export default function LegacyLoader({ html }: { html: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scripts = Array.from(container.querySelectorAll("script"))

    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script")

      // Copy attributes (type, src, etc.)
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value)
      })

      // Copy inline script body
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent
      }

      oldScript.parentNode?.replaceChild(newScript, oldScript)
    })

    // Signal that the legacy DOM is mounted and any inline scripts have run,
    // in case legacy code wants to hook a "ready" event.
    window.dispatchEvent(new CustomEvent("legacy-loader:mounted"))
  }, [html])

  return (
    <div
      ref={containerRef}
      id="legacy-loader-root"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
