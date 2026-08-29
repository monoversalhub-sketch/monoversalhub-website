import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const MONO_DIR = path.join(ROOT, '.monoversal')

function parseStatusFromText(text) {
  // Look for a line like: status: value
  const m = text.match(/^status:\s*(\w+)/mi)
  return m ? m[1].toLowerCase() : 'unknown'
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url)
    const project = searchParams.get('project') || 'monoversalhub'
    const specPath = path.join(MONO_DIR, 'spec', `${project}.md`)

    let specText = ''
    try {
      specText = fs.readFileSync(specPath, 'utf8')
    } catch (e) {
      return new Response(JSON.stringify({ error: 'spec not found', project }), { status: 404 })
    }

    const specStatus = parseStatusFromText(specText)

    // Read artifact statuses for stages
    const stages = ['spec','plan','design','database','integration','backend','frontend','review']
    const results = {}
    for (const s of stages) {
      const artifactFile = path.join(MONO_DIR, 'artifact', project, s === 'spec' ? '' : s, 'README.md')
      try {
        const t = fs.readFileSync(artifactFile, 'utf8')
        results[s] = parseStatusFromText(t)
      } catch (e) {
        results[s] = s === 'spec' ? specStatus : 'missing'
      }
    }

    // Determine next stage: first artifact that's missing or draft
    const order = ['spec','plan','design','database','integration','backend','frontend','review']
    let next = null
    for (const s of order) {
      const st = results[s]
      if (st === 'missing' || st === 'draft' || st === 'approved') {
        // special: if spec is draft -> next is spec until approved
        if (s === 'spec' && st === 'approved') continue
        next = s
        break
      }
      if (st === 'in-progress') { next = s; break }
    }

    return new Response(JSON.stringify({ project, specStatus, artifacts: results, next }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
