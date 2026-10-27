import { Button, Card, Checkbox, Flex, Typography, App } from 'antd'
import { EngineError, type TicketsAndIslands } from '@pkhex-everywhere/engine'
import { useEvents } from '@pkhex-everywhere/react'
import { useEventEdit } from './useEventEdit'
import { useT } from '../../i18n'

export function TicketsTab({ gen3 }: { gen3: TicketsAndIslands }) {
  const t = useT()
  const { giveTickets, setFlag } = useEvents()
  const { message, modal } = App.useApp()
  const edit = useEventEdit()

  const give = async () => {
    const includeOldSeaMap =
      !gen3.oldSeaMapNeedsConfirmation ||
      (await modal.confirm({
        title: 'Add the Old Sea Map?',
        content: 'The Old Sea Map was only distributed in Japan. Add it to this save anyway?',
        okText: 'Add',
        cancelText: 'Skip',
      }))

    try {
      const added = await giveTickets(includeOldSeaMap)
      if (added.length === 0) message.info('No tickets were added.')
      else message.success(`Added ${added.join(', ')}.`)
    } catch (error) {
      if (!(error instanceof EngineError) || error.code !== 'pouch-full') throw error
      message.error(error.message)
    }
  }

  return (
    <Flex vertical gap={16}>
      <Card size="small" title={t('Tickets')}>
        <Flex vertical gap={12}>
          <Typography.Paragraph style={{ margin: 0 }}>Adds {gen3.tickets.join(', ')} to Key Items.</Typography.Paragraph>
          <div>
            <Button type="primary" disabled={!gen3.anyTicketMissing} onClick={give}>
              {t('Give tickets')}
            </Button>
          </div>
        </Flex>
      </Card>
      {gen3.islands.length > 0 && (
        <Card size="small" title={t('Islands')}>
          <Flex vertical gap={8}>
            {gen3.islands.map((island) => (
              <Checkbox
                key={island.index}
                checked={island.value}
                onChange={(e) => edit(() => setFlag(island.index, e.target.checked))}
              >
                {island.name}
              </Checkbox>
            ))}
          </Flex>
        </Card>
      )}
    </Flex>
  )
}
