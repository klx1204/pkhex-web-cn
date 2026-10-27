import { useMemo } from 'react'
import { useI18n } from './context'
import tables from './names/zh-Hans.json'

type Names = Record<string, string>
type NameTable = (name: string) => string

interface NameTables {
  species: Names
  forms: Names
  moves: Names
  abilities: Names
  natures: Names
  types: Names
  games: Names
  items: Names
  locations: Names
}

export interface GameNames {
  species: NameTable
  form: NameTable
  move: NameTable
  ability: NameTable
  nature: NameTable
  type: NameTable
  game: NameTable
  item: NameTable
  location: NameTable
}

const all = tables as NameTables

const identity: NameTable = (name) => name

const english: GameNames = {
  species: identity,
  form: identity,
  move: identity,
  ability: identity,
  nature: identity,
  type: identity,
  game: identity,
  item: identity,
  location: identity,
}

function from(table: Names): NameTable {
  return (name) => table[name] ?? table[name.replace(/^\((.*)\)$/, '$1')] ?? name
}

/** Maps the English names the engine sends to the current locale's game names. */
export function useGameNames(): GameNames {
  const { locale } = useI18n()
  return useMemo<GameNames>(() => {
    if (locale === 'en') return english
    return {
      species: from(all.species),
      form: from(all.forms),
      move: from(all.moves),
      ability: from(all.abilities),
      nature: from(all.natures),
      type: from(all.types),
      game: from(all.games),
      item: from(all.items),
      location: from(all.locations),
    }
  }, [locale])
}
