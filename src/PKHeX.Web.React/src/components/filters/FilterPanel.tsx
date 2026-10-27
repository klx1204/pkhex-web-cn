import type { ReactNode } from 'react'
import { Button, Flex } from 'antd'
import { useT } from '../../i18n'

interface FilterPanelProps {
  onConfirm: () => void
  onReset: () => void
  children: ReactNode
}

export function FilterPanel({ onConfirm, onReset, children }: FilterPanelProps) {
  const t = useT()
  return (
    <Flex vertical gap="small" style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      {children}
      <Flex justify="space-between" gap="small">
        <Button size="small" onClick={onReset}>
          {t('Reset')}
        </Button>
        <Button size="small" type="primary" onClick={onConfirm}>
          {t('OK')}
        </Button>
      </Flex>
    </Flex>
  )
}
