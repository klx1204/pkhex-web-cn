import { Suspense } from 'react'
import { Alert, Button, Spin } from 'antd'
import { Outlet } from 'react-router'
import { useEngineStatus } from '@pkhex-everywhere/react'
import { engine } from '../app'
import { applicationName } from '../constants'
import { useT } from '../i18n'
import { RoutedErrorBoundary } from './RoutedErrorBoundary'
import { WhenPlugInsLoaded } from './WhenPlugInsLoaded'

export function RoutedContent() {
  const { state } = useEngineStatus()
  if (state === 'failed') return <BootFailed />

  return (
    <RoutedErrorBoundary engine={engine}>
      <Suspense fallback={<Loading />}>
        <WhenPlugInsLoaded>
          <Outlet />
        </WhenPlugInsLoaded>
      </Suspense>
    </RoutedErrorBoundary>
  )
}

function BootFailed() {
  const t = useT()
  if (typeof WebAssembly === 'undefined')
    return (
      <Alert
        type="error"
        title={t(`{app} couldn't start`, { app: applicationName })}
        description={t('This browser has WebAssembly turned off, and the app needs it. Turn it on or open the page in another browser.')}
      />
    )

  return (
    <Alert
      type="error"
      title={t(`{app} couldn't start`, { app: applicationName })}
      description={t("Part of the app didn't download. Check your connection, then reload the page.")}
      action={<Button onClick={() => location.reload()}>{t('Reload')}</Button>}
    />
  )
}

function Loading() {
  const { state, loaded, total } = useEngineStatus()
  return <Spin percent={state === 'booting' && total ? (loaded / total) * 100 : undefined} />
}
