import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, rmSync, renameSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'

const root = fileURLToPath(new URL('../', import.meta.url))
process.chdir(root)
if (process.platform !== 'darwin') throw new Error('Audio generation uses macOS say. Existing MP3s can be played and deployed anywhere.')
const voice = process.env.TTS_VOICE || 'Samantha'
const rate = process.env.TTS_RATE || '165'
if (!/^\d+$/.test(rate) || Number(rate) < 80 || Number(rate) > 350) throw new Error('TTS_RATE must be 80–350 words per minute.')
execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' })
const md = new MarkdownIt({ html: true })
function narration(markdown) {
  const tokens = md.parse(markdown, {})
  const paragraphs = []
  let inTable = false, row = [], headers = []
  const inline = token => (token.children || []).map(t => ['text', 'code_inline'].includes(t.type) ? t.content : ['softbreak', 'hardbreak'].includes(t.type) ? ' ' : '').join('')
  for (const token of tokens) {
    if (token.type === 'table_open') { inTable = true; headers = [] }
    if (token.type === 'tr_open') row = []
    if (token.type === 'inline') {
      const text = inline(token).trim()
      if (inTable) row.push(text)
      else if (text) paragraphs.push(text)
    }
    if (token.type === 'tr_close') {
      if (!headers.length) headers = row
      else paragraphs.push(row.map((value, i) => i === 0 ? value : `${headers[i]}: ${value}`).join('. '))
    }
    if (token.type === 'table_close') inTable = false
  }
  return paragraphs.join('\n\n').replace(/\bGSM\b/g, 'grams per square meter')
}
const inputs = [
  ['welcome', 'Welcome — start here', 'audio/welcome.txt'],
  ['asket', 'Listen to the ASKET brief', 'docs/competitors/asket.md'],
  ['son-of-a-tailor', 'Listen to the Son of a Tailor brief', 'docs/competitors/son-of-a-tailor.md'],
  ['true-classic', 'Listen to the True Classic brief', 'docs/competitors/true-classic.md']
]
const temp = mkdtempSync(join(tmpdir(), 'white-tee-audio-'))
const manifest = {}
mkdirSync('docs/public/audio', { recursive: true })
try {
  for (const [name, title, source] of inputs) {
    const raw = readFileSync(source, 'utf8')
    const transcript = source.endsWith('.md') ? narration(raw) : raw.trim()
    if (!transcript || /<AudioBrief|https?:\/\//.test(transcript)) throw new Error(`Unexpected narration content in ${source}`)
    const text = join(temp, `${name}.txt`), aiff = join(temp, `${name}.aiff`), mp3 = join(temp, `${name}.mp3`)
    writeFileSync(text, transcript)
    execFileSync('/usr/bin/say', ['-v', voice, '-r', rate, '-f', text, '-o', aiff])
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-i', aiff, '-codec:a', 'libmp3lame', '-b:a', '96k', mp3])
    const duration = Math.round(Number(execFileSync('ffprobe', ['-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', mp3], { encoding: 'utf8' }).trim()))
    manifest[name] = { title, file: `/audio/${name}.mp3`, duration, transcript }
  }
  for (const [name] of inputs) renameSync(join(temp, `${name}.mp3`), resolve(`docs/public/audio/${name}.mp3`))
  writeFileSync('docs/.vitepress/theme/audio.generated.json', JSON.stringify(manifest, null, 2) + '\n')
  console.log(`Generated ${inputs.length} MP3s and matching transcripts using ${voice} at ${rate} words per minute.`)
} finally { rmSync(temp, { recursive: true, force: true }) }
