import { Button, Table, type TableColumnsType } from 'antd'
import type { OwnedItem } from '@pkhex-everywhere/engine'
import { useT } from '../i18n'
import { ItemIcon } from './ItemIcon'
import { NumberFilter } from './filters/NumberFilter'
import { containsText } from './filters/containsText'
import { TextFilter } from './filters/TextFilter'

interface ItemsTableProps {
  items: OwnedItem[]
  onEdit: (item: OwnedItem) => void
}

export function ItemsTable({ items, onEdit }: ItemsTableProps) {
  const t = useT()
  const columns: TableColumnsType<OwnedItem> = [
    {
      key: 'icon',
      width: 60,
      render: (_, item) => !item.isUnknown && <ItemIcon name={item.name} />,
    },
    {
      title: t('Name'),
      dataIndex: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: (props) => <TextFilter {...props} placeholder={t('Name')} />,
      onFilter: (value, item) => containsText(item.name, value),
    },
    {
      title: t('Amount'),
      dataIndex: 'count',
      sorter: (a, b) => a.count - b.count,
      filterDropdown: (props) => <NumberFilter {...props} placeholder={t('Amount')} min={0} />,
      onFilter: (value, item) => item.count === value,
    },
    {
      title: t('Action'),
      key: 'action',
      render: (_, item) => (
        <Button type="link" onClick={() => onEdit(item)}>
          {t('Edit')}
        </Button>
      ),
    },
  ]

  return (
    <Table
      rowKey="id"
      dataSource={items}
      columns={columns}
      size="small"
      scroll={{ x: 'max-content' }}
      pagination={{ hideOnSinglePage: true }}
    />
  )
}
