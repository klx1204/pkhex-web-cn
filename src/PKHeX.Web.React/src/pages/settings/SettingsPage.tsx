import { useState } from 'react'
import { AutoComplete, Descriptions, Flex, Select, Switch } from 'antd'
import { calculators } from '../../calculators'
import { changeCalculatorUrl, changeLocale, changeTheme, useCalculatorUrl, useLocale, useTheme } from '../../host'
import { useT } from '../../i18n'
import { localeNames, locales, type Locale } from '../../i18n/locale'

function CalculatorInput() {
  const calculatorUrl = useCalculatorUrl()
  const t = useT()
  const [text, setText] = useState(() => calculators.find((c) => c.url === calculatorUrl)?.name ?? calculatorUrl)

  const handleChange = (value: string | undefined) => {
    const next = value ?? ''
    setText(next)
    const preset = calculators.find((c) => c.name === next)
    changeCalculatorUrl(preset?.url ?? next)
  }

  return (
    <AutoComplete
      aria-label={t('Calculator')}
      style={{ width: '100%' }}
      value={text}
      onChange={handleChange}
      options={calculators.map((c) => ({ value: c.name, label: c.name }))}
      filterOption={false}
      placeholder={t('Calculator or URL (Default: Showdown)')}
      allowClear
    />
  )
}

export default function SettingsPage() {
  const theme = useTheme()
  const locale = useLocale()
  const t = useT()

  return (
    <Flex vertical gap={20}>
      <Descriptions
        title={t('General')}
        bordered
        size="small"
        column={1}
        items={[
          { key: 'calculator', label: t('Calculator'), children: <CalculatorInput /> },
          {
            key: 'language',
            label: t('Language'),
            children: (
              <Select<Locale>
                aria-label={t('Language')}
                style={{ width: 200 }}
                value={locale}
                onChange={changeLocale}
                options={locales.map((value) => ({ value, label: localeNames[value] }))}
              />
            ),
          },
        ]}
      />
      <Descriptions
        title={t('Appearance')}
        bordered
        size="small"
        column={1}
        items={[
          {
            key: 'theme',
            label: t('Theme'),
            children: (
              <Switch
                checked={theme === 'dark'}
                onChange={(dark) => changeTheme(dark ? 'dark' : 'light')}
                checkedChildren={t('Dark')}
                unCheckedChildren={t('Light')}
              />
            ),
          },
        ]}
      />
    </Flex>
  )
}
