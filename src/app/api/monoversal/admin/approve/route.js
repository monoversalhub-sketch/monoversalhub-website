import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const MONO_DIR = path.join(ROOT, '.monoversal')
const VALID_STATUSES = ['draft','approved','in-progress','done']

function replaceOrInsertStatus(text, status){
  if (/^status:\s*\w+/gmi.test(text)){
    return text.replace(/^status:\s*\w+/gmi, `status: ${status}`)
  }
  return `status: ${status}\n\n` + text
}

export async function POST(req){
  try{
    const body = await req.json().catch(()=>({}))
    const project = body.project || 'monoversalhub'
    const target = body.target // 'spec' or a stage name like 'plan'
    const status = (body.status || '').toLowerCase()

    if (!target) return new Response(JSON.stringify({ error: 'missing target' }), { status: 400 })
    if (!VALID_STATUSES.includes(status)) return new Response(JSON.stringify({ error: 'invalid status' }), { status: 400 })

    // target handling
    if (target === 'spec'){
      const specPath = path.join(MONO_DIR, 'spec', `${project}.md`)
      if (!fs.existsSync(specPath)) return new Response(JSON.stringify({ error: 'spec not found' }), { status: 404 })
      const text = fs.readFileSync(specPath, 'utf8')
      const newText = replaceOrInsertStatus(text, status)
      fs.writeFileSync(specPath, newText, 'utf8')

      // write worklog
      const worklogDir = path.join(MONO_DIR, 'artifact', project, 'worklog')
      if (!fs.existsSync(worklogDir)) fs.mkdirSync(worklogDir, { recursive: true })
      const ts = new Date().toISOString().replace(/[:.]/g,'-')
      const file = path.join(worklogDir, `approve-spec-${ts}.md`)
      fs.writeFileSync(file, `timestamp: ${new Date().toISOString()}\nSpec status changed to: ${status}`)

      return new Response(JSON.stringify({ project, target: 'spec', status }), { status: 200 })
    }

    // treat target as stage name
    const stageFile = path.join(MONO_DIR, 'artifact', project, target, 'README.md')
    if (!fs.existsSync(stageFile)){
      // create file with status
      const dir = path.dirname(stageFile)
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(stageFile, `status: ${status}\n`)
    } else {
      const text = fs.readFileSync(stageFile, 'utf8')
      const newText = replaceOrInsertStatus(text, status)
      fs.writeFileSync(stageFile, newText, 'utf8')
    }

    // worklog entry
    const worklogDir = path.join(MONO_DIR, 'artifact', project, 'worklog')
    if (!fs.existsSync(worklogDir)) fs.mkdirSync(worklogDir, { recursive: true })
    const ts = new Date().toISOString().replace(/[:.]/g,'-')
    const file = path.join(worklogDir, `approve-${target}-${ts}.md`)
    fs.writeFileSync(file, `timestamp: ${new Date().toISOString()}\n${target} status changed to: ${status}`)

    return new Response(JSON.stringify({ project, target, status }), { status: 200 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
