import { Alert, Empty, Flex, Tabs } from 'antd'
import { useEvents } from '@pkhex-everywhere/react'
import { PageHeader } from '../../components/PageHeader'
import { FlagsTab } from './FlagsTab'
import { TicketsTab } from './TicketsTab'
import { WorkTab } from './WorkTab'
import { useT } from '../../i18n'

export default function EventsPage() {
  const t = useT()
  const { events } = useEvents()

  return (
    <Flex vertical gap={20}>
      <PageHeader title="Events" />
      <Alert
        type="warning"
        showIcon
        title={t("Changing event flags can break story progression. Keep a backup of your save.")}
      />
      {events ? (
        <Tabs
          items={[
            ...(events.gen3 ? [{ key: 'gen3', label: 'Tickets and islands', children: <TicketsTab gen3={events.gen3} /> }] : []),
            { key: 'flags', label: 'Flags', children: <FlagsTab events={events} /> },
            ...(events.work.length > 0 ? [{ key: 'work', label: 'Work', children: <WorkTab events={events} /> }] : []),
          ]}
        />
      ) : (
        <Empty description={t('This save has no event labels to edit.')} />
      )}
    </Flex>
  )
}
