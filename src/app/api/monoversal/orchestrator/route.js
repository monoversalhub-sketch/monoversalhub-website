import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const MONO_DIR = path.join(ROOT, '.monoversal')

const STAGES = ['spec','plan','design','database','integration','backend','frontend','review']

function parseStatus(text){
  const m = text && text.match(/^status:\s*(\w+)/mi)
  return m ? m[1].toLowerCase() : 'missing'
}

function writeStatusFile(filePath, status){
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  const content = `status: ${status}\n` + fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : ''
  fs.writeFileSync(filePath, content, 'utf8')
}

export async function POST(req){
  try{
    const body = await req.json().catch(()=>({}))
    const project = body.project || 'monoversalhub'
    const stage = body.stage
    const action = body.action // 'start' | 'complete'
    const testsPassed = !!body.testsPassed

    if (!stage || !STAGES.includes(stage)){
      return new Response(JSON.stringify({ error: 'invalid or missing stage' }), { status: 400 })
    }

    // determine previous stage
    const idx = STAGES.indexOf(stage)
    const prev = idx === 0 ? null : STAGES[idx-1]

    // read prev status
    let prevStatus = 'missing'
    if (prev === 'spec'){
      const specPath = path.join(MONO_DIR, 'spec', `${project}.md`)
      if (fs.existsSync(specPath)) prevStatus = parseStatus(fs.readFileSync(specPath,'utf8'))
    } else if (prev){
      const artDir = path.join(MONO_DIR, 'artifact', project, prev)
      if (fs.existsSync(artDir)){
        const files = fs.readdirSync(artDir).filter(f=>f.endsWith('.md'))
        if (files.length) prevStatus = parseStatus(fs.readFileSync(path.join(artDir,files[0]), 'utf8'))
      }
    }

    // Gate: before starting a stage, require prevStatus === 'approved' (unless prev is null)
    if (action === 'start'){
      if (prev && prevStatus !== 'approved'){
        return new Response(JSON.stringify({ error: 'upstream artifact not approved', prev, prevStatus }), { status: 409 })
      }
      // mark this stage artifact as in-progress (create README.md)
      const targetFile = path.join(MONO_DIR, 'artifact', project, stage, 'README.md')
      const dir = path.dirname(targetFile)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(targetFile, `status: in-progress\n\nThis artifact was started by the Orchestrator.`)
      return new Response(JSON.stringify({ project, stage, status: 'in-progress' }), { status: 200 })
    }

    if (action === 'complete'){
      if (!testsPassed){
        return new Response(JSON.stringify({ error: 'tests did not pass; cannot complete stage' }), { status: 409 })
      }
      // mark artifact as done
      const targetFile = path.join(MONO_DIR, 'artifact', project, stage, 'README.md')
      const dir = path.dirname(targetFile)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(targetFile, `status: done\n\nThis artifact was completed by the Orchestrator.`)

      // write worklog
      const worklogDir = path.join(MONO_DIR, 'artifact', project, 'worklog')
      if (!fs.existsSync(worklogDir)) fs.mkdirSync(worklogDir, { recursive: true })
      const ts = new Date().toISOString().replace(/[:.]/g,'-')
      const file = path.join(worklogDir, `orchestrator-complete-${stage}-${ts}.md`)
      fs.writeFileSync(file, `timestamp: ${new Date().toISOString()}\nOrchestrator marked stage ${stage} done.`)

      return new Response(JSON.stringify({ project, stage, status: 'done' }), { status: 200 })
    }

    return new Response(JSON.stringify({ error: 'unknown action' }), { status: 400 })
  }catch(err){
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
