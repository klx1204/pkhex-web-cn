import { Alert } from 'antd'
import type { Legality } from '@pkhex-everywhere/engine'
import { useT } from '../../i18n'

interface LegalityBannerProps {
  legality: Legality
}

export function LegalityBanner({ legality }: LegalityBannerProps) {
  const t = useT()
  if (legality.messages.length === 0) return null

  return (
    <Alert
      key={legality.messages.join('\n')}
      type="error"
      title={t('Not legal')}
      closable
      description={
        <ul>
          {legality.messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      }
    />
  )
}
