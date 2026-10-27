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
          <header style={{ textAlign: 'center', marginBottom: 4 }}>
            <h1 style={{ fontSize: 'clamp(22px, 3vw, 30px)', lineHeight: 1.2, margin: '0 0 8px', letterSpacing: 0.2 }}>
              {t('Load a save')}
            </h1>
            <p style={{ color: 'var(--pkm-muted)', fontSize: 14, margin: 0 }}>
              {t('Drop a save file, or pick a way to start. Everything stays on your device.')}
            </p>
          </header>
          <RoutedContent />
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  )
}
