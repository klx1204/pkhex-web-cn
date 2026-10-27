import { Layout } from 'antd'
import { useT } from '../i18n'
import { Footer } from './Footer'
import { RoutedContent } from './RoutedContent'

export function LoadLayout() {
  const t = useT()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Content style={{ margin: '24px 16px 0', display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: '100%',
            maxWidth: 728 + 2 * 24,
            padding: 24,
            minHeight: 360,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          {t('Open a save file')}
          <RoutedContent />
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  )
}
