// Builds the English -> Simplified Chinese name tables from PKHeX's own localisation
// resources, which sit next to the engine code in external/PKHeX. Run it after a
// submodule bump: node scripts/i18n-names.mjs
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = join(here, '..', '..', '..')
const textRoot = join(repoRoot, 'external', 'PKHeX', 'PKHeX.Core', 'Resources', 'text')
const outFile = join(here, '..', 'src', 'i18n', 'names', 'zh-Hans.json')

const lines = (file) => {
  if (!existsSync(file)) return null
  return readFileSync(file, 'utf8').split(/\r?\n/)
}

/** Pairs an English and a Chinese file that list the same ids in the same order. */
function pair(enFile, zhFile, into) {
  const en = lines(enFile)
  const zh = lines(zhFile)
  if (!en || !zh) return
  const count = Math.min(en.length, zh.length)
  for (let i = 0; i < count; i++) {
    const key = en[i]?.trim()
    const value = zh[i]?.trim()
    if (!key || !value || key === value) continue
    into[key] ??= value
  }
}

const tables = { species: {}, forms: {}, moves: {}, abilities: {}, natures: {}, types: {}, games: {}, items: {}, locations: {} }

const other = (name) => [join(textRoot, 'other', 'en', `text_${name}_en.txt`), join(textRoot, 'other', 'zh-Hans', `text_${name}_zh-Hans.txt`)]

pair(...other('Species'), tables.species)
pair(...other('Forms'), tables.forms)
pair(...other('Moves'), tables.moves)
pair(...other('Abilities'), tables.abilities)
pair(...other('Natures'), tables.natures)
pair(...other('Types'), tables.types)
pair(...other('Games'), tables.games)

// Items: the flat list, then each generation that overrides names.
const itemDir = join(textRoot, 'items')
pair(join(itemDir, 'text_Items_en.txt'), join(itemDir, 'text_Items_zh-Hans.txt'), tables.items)
for (const entry of readdirSync(itemDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const dir = join(itemDir, entry.name)
  for (const file of readdirSync(dir)) {
    const match = file.match(/^(text_Items_.+)_en\.txt$/)
    if (!match) continue
    pair(join(dir, file), join(dir, `${match[1]}_zh-Hans.txt`), tables.items)
  }
}

// Met locations: one file per game family, paired file by file.
const locationDir = join(textRoot, 'locations')
for (const entry of readdirSync(locationDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue
  const dir = join(locationDir, entry.name)
  for (const file of readdirSync(dir)) {
    const match = file.match(/^(.+)_en\.txt$/)
    if (!match) continue
    pair(join(dir, file), join(dir, `${match[1]}_zh-Hans.txt`), tables.locations)
  }
}

const sizes = Object.fromEntries(Object.entries(tables).map(([key, value]) => [key, Object.keys(value).length]))
const empty = Object.entries(sizes).filter(([, size]) => size === 0)
if (empty.length) {
  console.error(`no entries for: ${empty.map(([key]) => key).join(', ')}`)
  process.exitCode = 1
}

mkdirSync(dirname(outFile), { recursive: true })
writeFileSync(outFile, `${JSON.stringify(tables, null, 0)}\n`)
console.log(`wrote ${outFile}`)
console.log(sizes)
