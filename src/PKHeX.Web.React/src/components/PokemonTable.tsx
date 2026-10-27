import { Table, type TableColumnsType } from 'antd'
import type { PokemonSummary } from '@pkhex-everywhere/engine'
import { useT } from '../i18n'
import { PokemonActions } from './PokemonActions'
import { PokemonSprite } from './PokemonSprite'
import { NumberFilter } from './filters/NumberFilter'
import { containsText } from './filters/containsText'
import { TextFilter } from './filters/TextFilter'

type Translate = (key: string) => string

const leadingColumns = (t: Translate): TableColumnsType<PokemonSummary> => [
  {
    key: 'sprite',
    width: 80,
    render: (_, pokemon) => <PokemonSprite pokemon={pokemon} />,
  },
  {
    title: t('Name'),
    dataIndex: 'species',
    sorter: (a, b) => a.species.localeCompare(b.species),
    filterDropdown: (props) => <TextFilter {...props} placeholder={t('Name')} />,
    onFilter: (value, pokemon) => containsText(pokemon.species, value),
  },
  {
    title: t('Level'),
    dataIndex: 'level',
    sorter: (a, b) => a.level - b.level,
    filterDropdown: (props) => <NumberFilter {...props} placeholder={t('Level')} min={1} max={100} />,
    onFilter: (value, pokemon) => pokemon.level === value,
  },
]

const actionColumn = (t: Translate): TableColumnsType<PokemonSummary>[number] => ({
  title: t('Action'),
  key: 'action',
  render: (_, pokemon) => <PokemonActions pokemon={pokemon} />,
})

const rowKey = (pokemon: PokemonSummary) => JSON.stringify(pokemon.at)

interface PokemonTableProps {
  pokemon: PokemonSummary[]
  extraColumns?: TableColumnsType<PokemonSummary>
  actions?: boolean
  selected?: PokemonSummary[]
  onSelectedChange?: (selected: PokemonSummary[]) => void
}

export function PokemonTable({ pokemon, extraColumns = [], actions = true, selected = [], onSelectedChange }: PokemonTableProps) {
  const t = useT()
  return (
    <Table<PokemonSummary>
      rowKey={rowKey}
      dataSource={pokemon}
      columns={[...leadingColumns(t), ...extraColumns, ...(actions ? [actionColumn(t)] : [])]}
      rowSelection={
        onSelectedChange && {
          selectedRowKeys: selected.map(rowKey),
          onChange: (_, rows) => onSelectedChange(rows),
        }
      }
      size="small"
      scroll={{ x: 'max-content' }}
      pagination={{ hideOnSinglePage: true }}
    />
  )
}
