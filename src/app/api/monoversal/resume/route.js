import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const MONO_DIR = path.join(ROOT, '.monoversal')

function parseStatusFromText(text) {
  const m = text.match(/^status:\s*(\w+)/mi)
  return m ? m[1].toLowerCase() : 'unknown'
}

function writeWorklog(project, entry) {
  const worklogDir = path.join(MONO_DIR, 'artifact', project, 'worklog')
  if (!fs.existsSync(worklogDir)) fs.mkdirSync(worklogDir, { recursive: true })
  const ts = new Date().toISOString().replace(/[:.]/g,'-')
  const file = path.join(worklogDir, `resume-${ts}.md`)
  fs.writeFileSync(file, `timestamp: ${new Date().toISOString()}\n${entry}\n`)
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}))
    const project = body.project || 'monoversalhub'
    const specPath = path.join(MONO_DIR, 'spec', `${project}.md`)

    if (!fs.existsSync(specPath)) {
      return new Response(JSON.stringify({ error: 'spec not found', project }), { status: 404 })
    }

    const specText = fs.readFileSync(specPath, 'utf8')
    const specStatus = parseStatusFromText(specText)

    if (specStatus !== 'approved') {
      return new Response(JSON.stringify({ error: 'spec not approved. change status to approved to resume.', specStatus }), { status: 409 })
    }

    // Find next stage by scanning artifact statuses
    const stages = ['plan','design','database','integration','backend','frontend','review']
    let next = null
    for (const s of stages) {
      const artifactFile = path.join(MONO_DIR, 'artifact', project, s, 'README.md')
      let st = 'missing'
      if (fs.existsSync(artifactFile)) st = parseStatusFromText(fs.readFileSync(artifactFile, 'utf8'))
      if (st === 'missing' || st === 'draft') { next = s; break }
      if (st === 'approved') { next = s; break }
      if (st === 'in-progress') { next = s; break }
    }

    if (!next) next = 'done'

    // Write a short worklog entry and return next stage
    const entry = `Resuming project ${project} — next stage: ${next}`
    writeWorklog(project, entry)

    return new Response(JSON.stringify({ project, next }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
