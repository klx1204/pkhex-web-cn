import { Alert, Button, Descriptions, Flex, Grid, InputNumber, Space } from 'antd'
import type { DescriptionsProps } from 'antd'
import { draftHandle, type StatPatch, type StatValues } from '@pkhex-everywhere/engine'
import { useLoadedGame, useQuery } from '@pkhex-everywhere/react'
import { gameName, statsAreApproximate } from '../../capabilities'
import { PlugInActionButton } from '../../components/PlugInActionButton'
import { useDraft } from './useDraft'
import { useT } from '../../i18n'

type Stat = keyof StatValues

const stats: { key: Stat; label: string }[] = [
  { key: 'health', label: 'HP' },
  { key: 'attack', label: 'Attack' },
  { key: 'defense', label: 'Defense' },
  { key: 'specialAttack', label: 'Special Attack' },
  { key: 'specialDefense', label: 'Special Defense' },
  { key: 'speed', label: 'Speed' },
]

const total = (values: StatValues) => stats.reduce((sum, stat) => sum + values[stat.key], 0)

export function StatsTab() {
  const t = useT()
  const { details, submit } = useDraft()
  const { game } = useLoadedGame()
  const actions = useQuery('plugins.actions', 'pokemonStats', draftHandle)
  const screens = Grid.useBreakpoint()
  const layout = screens.sm ? 'horizontal' : 'vertical'

  const inputs: { key: 'ivs' | 'evs' | 'avs'; label: string; values: StatValues | null }[] = [
    { key: 'ivs', label: t('IV'), values: details.ivs },
    { key: 'evs', label: t('EV'), values: details.evs },
    { key: 'avs', label: t('AV'), values: details.avs },
  ]

  const statItems = (stat: { key: Stat; label: string }): DescriptionsProps['items'] => [
    { key: 'stat', label: t('Stat'), children: details.stats[stat.key] },
    ...inputs.flatMap(({ key, label, values }) =>
      values === null
        ? []
        : [
            {
              key,
              label,
              children: (
                <InputNumber
                  aria-label={`${t(stat.label)} ${label}`}
                  min={0}
                  value={values[stat.key]}
                  onChange={(value) => value !== null && submit({ [key]: { [stat.key]: value } as StatPatch })}
                />
              ),
            },
          ],
    ),
  ]

  const totalItems: DescriptionsProps['items'] = [
    { key: 'stat', label: t('Stat'), children: total(details.stats) },
    ...inputs.flatMap(({ key, label, values }) => (values === null ? [] : [{ key, label, children: total(values) }])),
  ]

  return (
    <Flex vertical gap={20}>
      {game && statsAreApproximate(game) && (
        <Alert
          type="info"
          showIcon
          title={t("Stats are approximate. They use the original games' base stats, which {game} may change.", { game: gameName(game) })}
        />
      )}
      {stats.map((stat) => (
        <Descriptions key={stat.key} bordered size="small" layout={layout} title={t(stat.label)} items={statItems(stat)} />
      ))}
      <Descriptions bordered size="small" layout={layout} title={t('Total')} items={totalItems} />
      {details.hiddenPower && (
        <Descriptions
          bordered
          size="small"
          layout={layout}
          title={t('Hidden Power')}
          items={[
            { key: 'type', label: t('Type'), children: details.hiddenPower.type },
            ...(details.hiddenPower.power === null
              ? []
              : [{ key: 'power', label: t('Power'), children: details.hiddenPower.power }]),
          ]}
        />
      )}
      {details.combatPower !== null && (
        <Descriptions
          bordered
          size="small"
          layout={layout}
          title={t('Extra')}
          items={[
            {
              key: 'combatPower',
              label: t('CP'),
              children: (
                <Space>
                  <InputNumber
                    aria-label={t('CP')}
                    min={0}
                    value={details.combatPower}
                    onChange={(combatPower) => combatPower !== null && submit({ combatPower })}
                  />
                  <Button onClick={() => submit({ combatPower: details.calculatedCombatPower })}>{t('Re-calculate')}</Button>
                </Space>
              ),
            },
          ]}
        />
      )}
      {actions.length > 0 && (
        <Space wrap size={20} align="center">
          {actions.map((action) => (
            <PlugInActionButton key={action.id} action={action} target={draftHandle} />
          ))}
        </Space>
      )}
    </Flex>
  )
}
