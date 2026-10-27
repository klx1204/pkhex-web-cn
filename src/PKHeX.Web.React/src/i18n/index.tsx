import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react'
import { detectLocale, type Locale } from './locale'
import zhHans from './zh-Hans'

export type { Locale } from './locale'
export type Messages = Record<string, string>
export type Values = Record<string, string | number | undefined>

// English is the source text, so it needs no table: a key that is missing from a
// translation falls back to the key itself. That keeps the app working when the
// upstream adds strings we have not translated yet.
const tables: Record<Locale, Messages> = { 'zh-Hans': zhHans, en: {} }

interface I18nValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, values?: Values) => string
}

const I18nContext = createContext<I18nValue | null>(null)

interface I18nProviderProps {
  locale: Locale
  setLocale: (locale: Locale) => void
  children: ReactNode
}

export function I18nProvider({ locale, setLocale, children }: I18nProviderProps) {
  const value = useMemo<I18nValue>(
    () => ({ locale, setLocale, t: (key, values) => translate(tables[locale], key, values) }),
    [locale, setLocale],
  )
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n must be used inside I18nProvider')
  return value
}

/** Translates an English source string into the current locale. */
export function useT(): (key: string, values?: Values) => string {
  const { t } = useI18n()
  return useCallback(t, [t])
}

export function translate(messages: Messages, key: string, values?: Values): string {
  const text = messages[key] ?? key
  if (!values) return text
  return text.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = values[name]
    return value === undefined ? match : String(value)
  })
}

export function resolveInitialLocale(read: () => Locale | null): Locale {
  return read() ?? detectLocale()
}
