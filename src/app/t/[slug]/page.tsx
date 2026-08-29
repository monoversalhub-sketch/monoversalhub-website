import { notFound } from 'next/navigation'
import { Client } from '@neondatabase/serverless'

async function getTailorBySlug(slug: string | undefined) {
  if (!slug) return null
  const conn = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL
  if (!conn) return null
  const client = new Client({ connectionString: conn })
  try {
    await client.connect()
    const res = await client.query(
      `SELECT
         COALESCE(name, business_name) AS name,
         COALESCE(city, address_city) AS city,
         COALESCE(craft, service) AS craft,
         COALESCE(whatsapp_number, phone, contact_phone) AS whatsapp,
         COALESCE(boss_score, score) AS score,
         COALESCE(slug, url_slug) AS slug
       FROM tailors
       WHERE COALESCE(slug, url_slug) = $1
       LIMIT 1`,
      [slug]
    )
    await client.end()
    if (!res.rows.length) return null
    const r = res.rows[0]
    return { name: r.name, city: r.city, craft: r.craft || 'Tailoring', whatsapp: r.whatsapp, score: r.score || null, slug: r.slug }
  } catch (err) {
    try { await client.end() } catch (e) { }
    console.error('tailor lookup failed', err.message || err)
    return null
  }
}

export default async function TailorPage({ params }: { params: Promise<{ slug?: string }> }) {
  const { slug } = await params
  const tailor = await getTailorBySlug(slug)
  if (!tailor) {
    return notFound()
  }

  const wa = tailor.whatsapp ? `https://wa.me/${tailor.whatsapp}?text=${encodeURIComponent(`Hi ${tailor.name}, I found your profile on BOSS and I'd like to enquire about your services.`)}` : '#'

  return (
    <main className="container">
      <h1>{tailor.name}</h1>
      <div style={{ color: 'var(--muted)' }}>{tailor.city} · {tailor.craft}</div>
      <div style={{ marginTop: 12 }}>
        <strong>BOSS Score:</strong> {tailor.score ?? '—'}
      </div>
      <div style={{ marginTop: 18 }}>
        <a href={wa} className="btn">Inquire on WhatsApp</a>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: tailor.name,
        url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://monoversalhub-website.vercel.app'}/t/${tailor.slug}`,
        address: { '@type': 'PostalAddress', addressLocality: tailor.city, addressCountry: 'NG' },
        telephone: tailor.whatsapp ? `+${tailor.whatsapp}` : undefined
      }) }} />
    </main>
  )
}
