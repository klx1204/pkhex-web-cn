import { useState } from 'react'
import { Select } from 'antd'
import type { Choice } from '@pkhex-everywhere/engine'
import { useGameNames, type GameNames } from '../../i18n'

export type ChoiceKind = 'species' | 'form' | 'ability' | 'nature' | 'move' | 'location' | 'game'

interface ChoiceSelectProps {
  label: string
  choices: Choice[]
  value: number | null
  kind?: ChoiceKind
  disabled?: boolean
  onChange: (id: number) => void
}

export function ChoiceSelect({ label, choices, value, kind, disabled, onChange }: ChoiceSelectProps) {
  const [search, setSearch] = useState('')
  const gameNames = useGameNames()
  const translate = kind ? nameTableFor(gameNames, kind) : (name: string) => name

  return (
    <Select<number>
      value={value ?? undefined}
      disabled={disabled}
      aria-label={label}
      placeholder={label}
      style={{ width: '100%' }}
      showSearch={{ searchValue: search, onSearch: setSearch }}
      filterOption={(input, option) => {
        if (!option) return false
        const query = input.trim().toLowerCase()
        const label = String(option.label ?? '')
        const english = String((option as { english?: string }).english ?? '')
        return !query || label.toLowerCase().includes(query) || english.toLowerCase().includes(query)
      }}
      virtual
      options={choices.map((choice) => ({ value: choice.id, label: translate(choice.name), english: choice.name }))}
      onSelect={() => setSearch('')}
      onChange={onChange}
    />
  )
}

function nameTableFor(names: GameNames, kind: ChoiceKind): (name: string) => string {
  switch (kind) {
    case 'species':
      return names.species
    case 'form':
      return names.form
    case 'ability':
      return names.ability
    case 'nature':
      return names.nature
    case 'move':
      return names.move
    case 'location':
      return names.location
    case 'game':
      return names.game
  }
}
