import type { ThemeConfig } from 'antd'
import { theme as antdTheme } from 'antd'

export type ThemeMode = 'light' | 'dark'

const fontFamily = `-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif`

export const palette = {
  light: {
    bg: '#f6f5f2',
    card: '#ffffff',
    line: '#e2e0da',
    text: '#22211f',
    muted: '#78746d',
    accent: '#0b7a72',
    accentStrong: '#09655e',
    accentSoft: '#e2f2f0',
    danger: '#b4342b',
    warn: '#96621a',
  },
  dark: {
    bg: '#16191a',
    card: '#1e2324',
    line: '#2f3637',
    text: '#e9edec',
    muted: '#98a19f',
    accent: '#4fc3b6',
    accentStrong: '#6fd6ca',
    accentSoft: '#1d3331',
    danger: '#ef8a80',
    warn: '#e0b26a',
  },
} as const

/** The shared design tokens, as CSS custom properties, so plain markup can use them too. */
export function cssVariables(mode: ThemeMode): Record<string, string> {
  const colors = palette[mode]
  return {
    '--pkm-bg': colors.bg,
    '--pkm-card': colors.card,
    '--pkm-line': colors.line,
    '--pkm-text': colors.text,
    '--pkm-muted': colors.muted,
    '--pkm-accent': colors.accent,
    '--pkm-accent-strong': colors.accentStrong,
    '--pkm-accent-soft': colors.accentSoft,
    '--pkm-radius': '14px',
    '--pkm-font': fontFamily,
  }
}

export function antdThemeFor(mode: ThemeMode): ThemeConfig {
  const colors = palette[mode]
  return {
    algorithm: mode === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: colors.accent,
      colorInfo: colors.accent,
      colorLink: colors.accent,
      colorBgLayout: colors.bg,
      colorBgContainer: colors.card,
      colorBorder: colors.line,
      colorBorderSecondary: colors.line,
      colorText: colors.text,
      colorTextSecondary: colors.muted,
      colorTextTertiary: colors.muted,
      borderRadius: 10,
      borderRadiusLG: 14,
      fontFamily,
      fontSize: 14,
    },
    components: {
      Layout: {
        bodyBg: colors.bg,
        headerBg: colors.card,
        siderBg: colors.card,
        footerBg: 'transparent',
        headerPadding: '0 20px',
        headerHeight: 60,
      },
      Menu: {
        itemBg: 'transparent',
        subMenuItemBg: 'transparent',
        itemColor: colors.muted,
        itemHoverColor: colors.text,
        itemHoverBg: colors.accentSoft,
        itemSelectedBg: colors.accentSoft,
        itemSelectedColor: colors.accentStrong,
        itemBorderRadius: 8,
        itemMarginInline: 8,
      },
      Table: {
        headerBg: colors.bg,
        rowHoverBg: colors.accentSoft,
        borderColor: colors.line,
        headerSplitColor: colors.line,
      },
      Card: { paddingLG: 18 },
      Button: { controlHeight: 40, borderRadius: 10 },
      Input: { controlHeight: 40 },
      InputNumber: { controlHeight: 40 },
      Select: { controlHeight: 40 },
      Descriptions: { labelBg: colors.bg },
      Tabs: { itemSelectedColor: colors.accentStrong },
    },
  }
}
