export type Locale = 'zh-Hans' | 'en'

export const locales: readonly Locale[] = ['zh-Hans', 'en']

export const localeNames: Record<Locale, string> = {
  'zh-Hans': '简体中文',
  en: 'English',
}

/** Chinese when the browser asks for it, English otherwise. */
export function detectLocale(navigator: Pick<Navigator, 'languages' | 'language'> | undefined = globalThis.navigator): Locale {
  const languages = navigator?.languages?.length ? navigator.languages : [navigator?.language ?? '']
  return languages.some((language) => language.toLowerCase().startsWith('zh')) ? 'zh-Hans' : 'en'
}
