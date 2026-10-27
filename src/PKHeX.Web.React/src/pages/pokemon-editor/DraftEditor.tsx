import type { ReactNode } from 'react'
import { Flex, Tabs } from 'antd'
import { draftHandle } from '@pkhex-everywhere/engine'
import { usePokemon, usePokemonDetails } from '@pkhex-everywhere/react'
import { PageHeader } from '../../components/PageHeader'
import { PokemonImage } from '../../components/PokemonImage'
import { DescriptionTab } from './DescriptionTab'
import { LegalityBanner } from './LegalityBanner'
import { MovesTab } from './MovesTab'
import { TrainerTab } from './TrainerTab'
import { MetConditionsTab } from './MetConditionsTab'
import { StatsTab } from './StatsTab'
import { useT } from '../../i18n'

interface DraftEditorProps {
  actions: ReactNode
}

export function DraftEditor({ actions }: DraftEditorProps) {
  const { pokemon } = usePokemon(draftHandle)
  const { details } = usePokemonDetails(draftHandle)
  const t = useT()

  return (
    <Flex vertical gap={20}>
      <PageHeader title={t('Pokemon')} extra={<PokemonImage pokemon={pokemon} />} />
      {details.legality && <LegalityBanner legality={details.legality} />}
      <Tabs
        items={[
          { key: 'description', label: t('Description'), children: <DescriptionTab /> },
          { key: 'metConditions', label: t('Met Conditions'), children: <MetConditionsTab /> },
          { key: 'stats', label: t('Stats'), children: <StatsTab /> },
          { key: 'moves', label: t('Moves'), children: <MovesTab /> },
          { key: 'trainer', label: t('Trainer'), children: <TrainerTab /> },
        ]}
      />
      <Flex justify="end">{actions}</Flex>
    </Flex>
  )
}
