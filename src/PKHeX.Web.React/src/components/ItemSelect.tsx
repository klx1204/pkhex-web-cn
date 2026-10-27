import { useState } from 'react'
import { Select, Space } from 'antd'
import { useGameNames, useT } from '../i18n'
import { ItemIcon } from './ItemIcon'

interface Item {
  id: number
  name: string
  isUnknown?: boolean
}

const hasIcon = (item: Item) => item.id !== 0 && !item.isUnknown

interface ItemSelectProps<T extends Item> {
  items: T[]
  label?: string
  value?: number
  placeholder?: string
  onChange: (item: T) => void
}

export function ItemSelect<T extends Item>({ items, label, value, placeholder, onChange }: ItemSelectProps<T>) {
  const [search, setSearch] = useState('')
  const t = useT()
  const gameNames = useGameNames()

  return (
    <Select<number, { value: number; label: string; english: string; icon: boolean }>
      value={value}
      aria-label={label}
      placeholder={placeholder ?? t('Select an item')}
      style={{ width: '100%' }}
      showSearch={{ searchValue: search, onSearch: setSearch }}
      filterOption={(input, option) => {
        const query = input.trim().toLowerCase()
        if (!option) return false
        return !query || option.label.toLowerCase().includes(query) || option.english.toLowerCase().includes(query)
      }}
      virtual
      options={items.map((item) => ({ value: item.id, label: gameNames.item(item.name), english: item.name, icon: hasIcon(item) }))}
      optionRender={({ data }) => <ItemOption icon={data.icon} name={data.label} sprite={data.english} />}
      labelRender={({ value }) => {
        const item = items.find((entry) => entry.id === Number(value))
        return (
          <ItemOption
            icon={!!item && hasIcon(item)}
            name={item ? gameNames.item(item.name) : String(value)}
            sprite={item?.name ?? ''}
          />
        )
      }}
      onSelect={() => setSearch('')}
      onChange={(id) => {
        const item = items.find((item) => item.id === id)
        if (item) onChange(item)
      }}
    />
  )
}

function ItemOption({ icon, name, sprite }: { icon: boolean; name: string; sprite?: string }) {
  return (
    <Space size={5}>
      {icon && <ItemIcon name={sprite ?? name} />}
      <span>{name}</span>
    </Space>
  )
}
