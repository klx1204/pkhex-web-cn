import { useState } from 'react'
import { Button, Descriptions, Grid, InputNumber, Radio, Space, Switch, Typography } from 'antd'
import type { DescriptionsProps } from 'antd'
import { draftHandle, type PokemonGender } from '@pkhex-everywhere/engine'
import { useQuery } from '@pkhex-everywhere/react'
import { ItemSelect } from '../../components/ItemSelect'
import { ChoiceSelect } from './ChoiceSelect'
import { ExperienceModal } from './ExperienceModal'
import { isLocked } from './locked'
import { useDraft } from './useDraft'
import { useT } from '../../i18n'

const typesUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield'

const genders: { value: PokemonGender; label: string }[] = [
  { value: 'male', label: '♂' },
  { value: 'female', label: '♀' },
  { value: 'genderless', label: '⚲' },
]

export function DescriptionTab() {
  const t = useT()
  const { details, submit } = useDraft()
  const options = useQuery('pokemon.options', draftHandle)
  const natures = useQuery('game.natures')
  const balls = useQuery('game.balls')
  const languages = useQuery('game.languages')
  const screens = Grid.useBreakpoint()
  const [editingExperience, setEditingExperience] = useState(false)

  const items: DescriptionsProps['items'] = [
    {
      key: 'species',
      label: t('Species'),
      children: (
        <ChoiceSelect label={t("Species")} kind="species" choices={options.species} value={details.species} onChange={(species) => submit({ species })} />
      ),
    },
    {
      key: 'types',
      label: t('Types'),
      children: (
        <Space size={5} wrap>
          {details.types.map((type) => (
            <img key={type} alt={`Type ${type}`} src={`${typesUrl}/${type + 1}.png`} style={{ width: 75 }} />
          ))}
        </Space>
      ),
    },
    {
      key: 'pid',
      label: t('PID'),
      children: <Typography.Text copyable>{details.pid.toString(16).toUpperCase().padStart(8, '0')}</Typography.Text>,
    },
    {
      key: 'nickname',
      label: t('Nickname'),
      children: (
        <Typography.Text editable={{ text: details.nickname, onChange: (nickname) => submit({ nickname }) }}>
          {details.nickname}
        </Typography.Text>
      ),
    },
    {
      key: 'gender',
      label: t('Gender'),
      children: (
        <Radio.Group
          aria-label="Gender"
          optionType="button"
          buttonStyle="solid"
          value={details.gender}
          disabled={isLocked(options, 'gender')}
          options={genders.filter((gender) => gender.value !== 'genderless' || details.gender === 'genderless')}
          onChange={(event) => submit({ gender: event.target.value as PokemonGender })}
        />
      ),
    },
    {
      key: 'shiny',
      label: t('Shiny'),
      children: <Switch aria-label="Shiny" checked={details.isShiny} onChange={(isShiny) => submit({ isShiny })} />,
    },
    ...(details.isAlpha === null
      ? []
      : [
          {
            key: 'alpha',
            label: t('Alpha'),
            children: <Switch aria-label="Alpha" checked={details.isAlpha} onChange={(isAlpha: boolean) => submit({ isAlpha })} />,
          },
        ]),
    {
      key: 'level',
      label: t('Level'),
      children: (
        <Space>
          <InputNumber
            aria-label="Level"
            min={1}
            max={100}
            value={details.level}
            onChange={(level) => level !== null && submit({ level })}
          />
          <Button type="link" size="small" onClick={() => setEditingExperience(true)}>
            {t('Edit EXP')}
          </Button>
        </Space>
      ),
    },
    ...(natures.length === 0
      ? []
      : [
          {
            key: 'nature',
            label: t('Nature'),
            children: (
              <ChoiceSelect
                label={t('Nature')}
                kind="nature"
                choices={natures}
                value={details.nature}
                disabled={isLocked(options, 'nature')}
                onChange={(nature) => submit({ nature })}
              />
            ),
          },
        ]),
    ...(options.forms.length === 0
      ? []
      : [
          {
            key: 'form',
            label: t('Form'),
            children: <ChoiceSelect label={t("Form")} kind="form" choices={options.forms} value={details.form} onChange={(form) => submit({ form })} />,
          },
        ]),
    ...(options.heldItems.length <= 1
      ? []
      : [
          {
            key: 'heldItem',
            label: t('Held Item'),
            children: (
              <ItemSelect
                items={options.heldItems}
                label={t('Held Item')}
                value={details.heldItem}
                onChange={(item) => submit({ heldItem: item.id })}
              />
            ),
          },
        ]),
    ...(options.abilities.length === 0
      ? []
      : [
          {
            key: 'ability',
            label: t('Ability'),
            children: (
              <ChoiceSelect
                label={t('Ability')}
                kind="ability"
                choices={options.abilities}
                value={details.ability}
                disabled={isLocked(options, 'ability')}
                onChange={(ability) => submit({ ability })}
              />
            ),
          },
        ]),
    ...(balls.length === 0
      ? []
      : [
          {
            key: 'ball',
            label: t('Ball'),
            children: <ItemSelect items={balls} label="Ball" value={details.ball} onChange={(ball) => submit({ ball: ball.id })} />,
          },
        ]),
    {
      key: 'friendship',
      label: t(details.isEgg ? 'Hatch Counter' : 'Friendship'),
      children: (
        <InputNumber
          aria-label={details.isEgg ? 'Hatch Counter' : 'Friendship'}
          min={0}
          max={255}
          value={details.friendship}
          onChange={(friendship) => friendship !== null && submit({ friendship })}
        />
      ),
    },
    ...(languages.length === 0
      ? []
      : [
          {
            key: 'language',
            label: t('Language'),
            children: (
              <ChoiceSelect
                label="Language"
                choices={languages}
                value={details.language}
                onChange={(language) => submit({ language })}
              />
            ),
          },
        ]),
    {
      key: 'egg',
      label: t('Egg'),
      children: <Switch aria-label="Egg" checked={details.isEgg} onChange={(isEgg) => submit({ isEgg })} />,
    },
    {
      key: 'infected',
      label: t('Infected'),
      children: <Switch aria-label="Infected" disabled checked={details.isInfected} />,
    },
    {
      key: 'cured',
      label: t('Cured'),
      children: <Switch aria-label="Cured" disabled checked={details.isCured} />,
    },
  ]

  return (
    <>
      <Descriptions
        bordered
        size="small"
        layout={screens.sm ? 'horizontal' : 'vertical'}
        column={{ xs: 1, sm: 2, md: 3 }}
        items={items}
      />
      {editingExperience && <ExperienceModal onClose={() => setEditingExperience(false)} />}
    </>
  )
}
