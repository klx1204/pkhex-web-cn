import { useRef, useState, type ChangeEvent } from 'react'
import { App, Flex } from 'antd'
import type { PokemonSummary } from '@pkhex-everywhere/engine'
import { useBox, useEngine, useLoadedGame } from '@pkhex-everywhere/react'
import { ButtonOrMenu } from '../../components/ButtonOrMenu'
import { PageHeader } from '../../components/PageHeader'
import { PokemonTable } from '../../components/PokemonTable'
import { useCopyShowdown } from '../../hooks/useCopyShowdown'
import { useSupports } from '../../hooks/useSupports'
import { openCalculator, useNavigate } from '../../host'
import { routes } from '../../routes'
import { boxActions } from './boxActions'
import { boxColumns } from './boxColumns'
import { TransferModal } from './TransferModal'
import { useLoadPokemonFile } from './useLoadPokemonFile'
import { useT } from '../../i18n'

const selectionKey = (pokemon: PokemonSummary) => `${pokemon.id}@${JSON.stringify(pokemon.at)}`

export default function BoxPage() {
  const t = useT()
  const { box } = useBox()
  const { game } = useLoadedGame()
  const engine = useEngine()
  const navigate = useNavigate()
  const copyShowdown = useCopyShowdown()
  const encountersSupported = useSupports('encounters')
  const showdownSupported = useSupports('showdown')
  const { notification } = App.useApp()
  const loadPokemonFile = useLoadPokemonFile()
  const fileInput = useRef<HTMLInputElement>(null)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [transferring, setTransferring] = useState(false)

  const selected = box.filter((pokemon) => selectedKeys.includes(selectionKey(pokemon)))

  const openSelectedInCalculator = async () => {
    const showdown = selected.length
      ? (await Promise.all(selected.map((pokemon) => engine.pokemon.showdown(pokemon.at)))).join('\n\n')
      : await engine.box.showdown()
    openCalculator(showdown)
  }

  const copyBoxShowdown = async () => {
    if (box.length === 0) {
      notification.error({ title: 'No Pokémon found in your box' })
      return
    }
    await copyShowdown(await engine.box.showdown(), `${box.length} entries`)
  }

  const loadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) await loadPokemonFile(file)
  }

  return (
    <Flex vertical gap={20}>
      <PageHeader
        title={t('Box')}
        extra={
          <>
            <ButtonOrMenu
              actions={boxActions(
                { encounters: encountersSupported, showdown: showdownSupported },
                {
                  add: () => navigate(routes.searchEncounter),
                  load: () => fileInput.current?.click(),
                  calculator: openSelectedInCalculator,
                  showdown: copyBoxShowdown,
                  transfer: () => setTransferring(true),
                },
                t,
              )}
            />
            <input ref={fileInput} type="file" hidden onChange={loadFile} />
          </>
        }
      />
      <PokemonTable
        pokemon={box}
        extraColumns={boxColumns(t)}
        selected={selected}
        onSelectedChange={(rows) => setSelectedKeys(rows.map(selectionKey))}
      />
      {transferring && game && <TransferModal game={game} onClose={() => setTransferring(false)} />}
    </Flex>
  )
}
