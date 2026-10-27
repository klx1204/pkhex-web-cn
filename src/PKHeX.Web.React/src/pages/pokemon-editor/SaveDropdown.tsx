import { EllipsisOutlined } from '@ant-design/icons'
import { Button, Dropdown, Space } from 'antd'
import { draftHandle } from '@pkhex-everywhere/engine'
import { useEngine, useQuery } from '@pkhex-everywhere/react'
import { PlugInActionButton } from '../../components/PlugInActionButton'
import { downloadFile } from '../../host'
import { useT } from '../../i18n'

interface SaveDropdownProps {
  onSave: () => void
}

export function SaveDropdown({ onSave }: SaveDropdownProps) {
  const engine = useEngine()
  const t = useT()
  const actions = useQuery('plugins.actions', 'pokemon', draftHandle)

  const exportFile = async () => {
    const { bytes, fileName } = await engine.pokemon.export(draftHandle)
    downloadFile(bytes, fileName)
  }

  return (
    <Space.Compact>
      <Button type="primary" onClick={onSave}>
        {t('Save changes')}
      </Button>
      <Dropdown
        trigger={['click']}
        menu={{
          items: [
            { key: 'export', label: t('Export *.pk'), onClick: () => void exportFile() },
            ...actions.map((action) => ({
              key: action.id,
              label: <PlugInActionButton action={action} target={draftHandle} />,
            })),
          ],
        }}
      >
        <Button type="primary" icon={<EllipsisOutlined />} aria-label={t('More actions')} />
      </Dropdown>
    </Space.Compact>
  )
}
