import { useCallback } from 'react'
import { useNavigate as useRouterNavigate } from 'react-router'
import { toBase64 } from './base64'
import { createStore } from './externalStore'
import { detectLocale, type Locale } from './i18n/locale'
import { createSettings, type Theme } from './settings'

export type { Theme } from './settings'

export const settings = createSettings()
const themeStore = createStore(settings.readTheme())
const localeStore = createStore<Locale>(settings.readLocale() ?? detectLocale())
const calculatorUrlStore = createStore(settings.readCalculatorUrl())

export function useTheme(): Theme {
  return themeStore.use()
}

export function changeTheme(next: Theme) {
  settings.writeTheme(next)
  themeStore.set(next)
}

export function useLocale(): Locale {
  return localeStore.use()
}

export function changeLocale(locale: Locale) {
  settings.writeLocale(locale)
  localeStore.set(settings.readLocale() ?? locale)
}

export function useCalculatorUrl(): string {
  return calculatorUrlStore.use()
}

export function changeCalculatorUrl(url: string) {
  settings.writeCalculatorUrl(url)
  calculatorUrlStore.set(settings.readCalculatorUrl())
}

export function useNavigate(): (url: string, options?: { replace?: boolean }) => Promise<void> {
  const navigate = useRouterNavigate()
  return useCallback(async (url: string, { replace = false } = {}) => await navigate(url, { replace }), [navigate])
}

export function openCalculator(showdown: string) {
  window.open(calculatorImportUrl(calculatorUrlStore.get(), showdown), '_blank')
}

function calculatorImportUrl(baseUrl: string, showdown: string) {
  return `${baseUrl}/?import=${toBase64(new TextEncoder().encode(showdown))}`
}

export function downloadFile(bytes: Uint8Array<ArrayBuffer>, fileName: string) {
  const url = URL.createObjectURL(new Blob([bytes], { type: 'application/octet-stream' }))
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  link.click()
  setTimeout(() => URL.revokeObjectURL(url))
}
