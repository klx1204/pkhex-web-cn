// Lists user-facing English strings that have no Chinese translation yet.
// Usage: node scripts/i18n-report.mjs [--json]
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const src = join(here, '..', 'src')
const messagesFile = join(src, 'i18n', 'zh-Hans.ts')

const keyPattern = /^\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|([A-Za-z_$][\w$]*))\s*:/gm
const messages = new Set()
for (const match of readFileSync(messagesFile, 'utf8').matchAll(keyPattern)) {
  messages.add(match[1] ?? match[2] ?? match[3])
}

const attributes = 'title|label|placeholder|description|aria-label|okText|cancelText|header|message'
const patterns = [
  new RegExp(`(?:${attributes})\\s*=\\s*"([^"]{2,})"`, 'g'),
  new RegExp(`(?:${attributes})\\s*=\\s*\\{\\s*['"\`]([^'"\`]{2,})['"\`]\\s*\\}`, 'g'),
  /\bt\(\s*['"`]([^'"`]{2,})['"`]\s*\)/g,
  />([^<>{}]*[A-Za-z][^<>{}]*)</g,
]

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) walk(path, out)
    else if (/\.tsx?$/.test(entry.name) && !entry.name.includes('.test.')) out.push(path)
  }
  return out
}

const clean = (value) => value.replace(/\s+/g, ' ').trim()

const report = new Map()
for (const file of walk(src)) {
  const text = readFileSync(file, 'utf8')
  const found = new Set()
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      const value = clean(match[1])
      if (value.length < 2 || !/[A-Za-z]/.test(value)) continue
      if (/[;{}]|=>|\b(const|let|var|function|return|import|export)\b/.test(value)) continue
      if (messages.has(value)) continue
      found.add(value)
    }
  }
  if (found.size) report.set(relative(src, file), [...found])
}

const entries = [...report.entries()].sort((a, b) => b[1].length - a[1].length)
const total = entries.reduce((sum, [, values]) => sum + values.length, 0)

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(Object.fromEntries(entries), null, 2))
} else {
  for (const [file, values] of entries) {
    console.log(`\n${file} (${values.length})`)
    for (const value of values) console.log(`  ${value}`)
  }
  console.log(`\n${total} strings in ${entries.length} files`)
}
