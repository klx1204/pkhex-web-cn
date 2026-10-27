import { Dropdown } from 'antd'
import type { PokemonSummary } from '@pkhex-everywhere/engine'
import { useEngine } from '@pkhex-everywhere/react'
import { openCalculator, useNavigate } from '../host'
import { useT } from '../i18n'
import { useCopyShowdown } from '../hooks/useCopyShowdown'
import { useSupports } from '../hooks/useSupports'
import { routes } from '../routes'

interface PokemonActionsProps {
  pokemon: PokemonSummary
}

export function PokemonActions({ pokemon }: PokemonActionsProps) {
  const engine = useEngine()
  const navigate = useNavigate()
  const t = useT()
  const copyShowdown = useCopyShowdown()
  const showdownSupported = useSupports('showdown')
  const showdown = () => engine.pokemon.showdown(pokemon.at)

  return (
    <Dropdown.Button
      type="link"
      trigger={['click']}
      onClick={() => navigate(routes.pokemon(pokemon))}
      menu={{
        items: [
          ...(pokemon.editable ? [{ key: 'clone', label: t('Clone'), onClick: () => navigate(routes.clonePokemon(pokemon)) }] : []),
          ...(showdownSupported
            ? [
                { key: 'calculator', label: t('Calculator'), onClick: async () => openCalculator(await showdown()) },
                { key: 'showdown', label: 'Showdown', onClick: async () => copyShowdown(await showdown(), pokemon.species) },
              ]
            : []),
        ],
      }}
    >
      {t('View')}
    </Dropdown.Button>
  )
}
