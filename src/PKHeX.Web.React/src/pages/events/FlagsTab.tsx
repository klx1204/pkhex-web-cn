import { Suspense, useState } from 'react'
import { Card, Checkbox, Flex, InputNumber, Space, Spin, Table, type TableColumnsType } from 'antd'
import type { EventFlag, SaveEvents } from '@pkhex-everywhere/engine'
import { useEvents, useQuery } from '@pkhex-everywhere/react'
import { humanize, useEventFilters } from './useEventFilters'
import { useEventEdit } from './useEventEdit'
import { useT } from '../../i18n'

export function FlagsTab({ events }: { events: SaveEvents }) {
  const t = useT()
  const { setFlag } = useEvents()
  const edit = useEventEdit()
  const { filtered, filters } = useEventFilters(events.flags)
  const [index, setIndex] = useState<number | null>(0)

  const columns: TableColumnsType<EventFlag> = [
    {
      title: t('Set'),
      key: 'value',
      width: 60,
      render: (_, flag) => (
        <Checkbox checked={flag.value} onChange={(e) => edit(() => setFlag(flag.index, e.target.checked))} />
      ),
    },
    { title: '#', dataIndex: 'index', width: 80 },
    { title: t('Name'), dataIndex: 'name' },
    { title: t('Category'), dataIndex: 'category', render: humanize },
  ]

  return (
    <Flex vertical gap={16}>
      {filters}
      <Table
        rowKey="index"
        dataSource={filtered}
        columns={columns}
        size="small"
        scroll={{ x: 'max-content' }}
        pagination={{ defaultPageSize: 20 }}
      />
      <Card size="small" title={t('Edit by index')}>
        <Space align="center">
          <InputNumber<number> min={0} max={events.flagCount - 1} precision={0} value={index} onChange={setIndex} />
          {index !== null && (
            <Suspense fallback={<Spin size="small" />}>
              <FlagAt index={index} />
            </Suspense>
          )}
        </Space>
      </Card>
    </Flex>
  )
}

function FlagAt({ index }: { index: number }) {
  const t = useT()
  const value = useQuery('events.flag', index)
  const { setFlag } = useEvents()
  const edit = useEventEdit()

  return (
    <Checkbox checked={value} onChange={(e) => edit(() => setFlag(index, e.target.checked))}>
      {t('Set')}
    </Checkbox>
  )
}
