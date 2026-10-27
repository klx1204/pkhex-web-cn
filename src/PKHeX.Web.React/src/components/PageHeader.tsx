import type { ReactNode } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Flex, Space, Typography } from 'antd'
import { useT } from '../i18n'

interface PageHeaderProps {
  title: ReactNode
  extra?: ReactNode
}

export function PageHeader({ title, extra }: PageHeaderProps) {
  const t = useT()
  return (
    <Flex justify="space-between" align="center" wrap gap="small">
      <Space>
        <Button type="text" icon={<ArrowLeftOutlined />} aria-label={t('Back')} onClick={() => history.back()} />
        <Typography.Title level={4} style={{ margin: 0 }}>
          {title}
        </Typography.Title>
      </Space>
      {extra && <Space>{extra}</Space>}
    </Flex>
  )
}
