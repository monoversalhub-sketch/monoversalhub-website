import { Client } from '@neondatabase/serverless'

export async function GET(req){
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  if(!slug) return new Response(JSON.stringify({error:'missing slug'}), { status:400 })
  const conn = process.env.DATABASE_URL || process.env.NEON_DATABASE_URL
  if(!conn) return new Response(JSON.stringify({error:'no db configured'}), { status:500 })
  const client = new Client({ connectionString: conn })
  try{
    await client.connect()
    // Defensive selection: attempt multiple common column names via COALESCE
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
       LIMIT 1`, [slug])
    await client.end()
    if(!res.rows.length) return new Response(JSON.stringify({error:'not found'}), { status:404 })
    return new Response(JSON.stringify(res.rows[0]), { status:200 })
  }catch(err){
    try{ await client.end() }catch(e){}
    console.error('tailor lookup failed', err.message || err)
    return new Response(JSON.stringify({error: err.message || 'db error'}), { status:500 })
  }
}
