import { useState } from 'react'
import { Select, Space } from 'antd'
import type { SpeciesEntry } from '@pkhex-everywhere/engine'
import { useQuery } from '@pkhex-everywhere/react'
import { useGameNames, useT } from '../i18n'
import { PokemonSprite } from './PokemonSprite'

interface SpeciesSelectProps {
  value?: number
  onChange: (species: SpeciesEntry) => void
}

export function SpeciesSelect({ value, onChange }: SpeciesSelectProps) {
  const species = useQuery('species.list')
  const [search, setSearch] = useState('')
  const t = useT()
  const gameNames = useGameNames()

  return (
    <Select<number, { value: number; label: string; english: string }>
      value={value}
      aria-label={t('Species')}
      placeholder={t('Select a species')}
      style={{ width: '100%' }}
      showSearch={{ searchValue: search, onSearch: setSearch }}
      filterOption={(input, option) => {
        const query = input.trim().toLowerCase()
        if (!option) return false
        return !query || option.label.toLowerCase().includes(query) || option.english.toLowerCase().includes(query)
      }}
      virtual
      options={species.map((entry) => ({ value: entry.id, label: gameNames.species(entry.name), english: entry.name }))}
      optionRender={({ data }) => <SpeciesOption id={data.value} name={data.label} />}
      labelRender={({ value, label }) => <SpeciesOption id={Number(value)} name={String(label)} />}
      onSelect={() => setSearch('')}
      onChange={(id) => {
        const entry = species.find((entry) => entry.id === id)
        if (entry) onChange(entry)
      }}
    />
  )
}

export function SpeciesOption({ id, name }: { id: number; name: string }) {
  return (
    <Space size={5} align="center">
      <span style={{ display: 'inline-flex', width: 40, height: 30, overflow: 'hidden', alignItems: 'center' }}>
        <PokemonSprite pokemon={{ speciesId: id, species: name }} />
      </span>
      <span>{name}</span>
    </Space>
  )
}
