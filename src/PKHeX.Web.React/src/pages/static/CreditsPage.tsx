import { Typography } from 'antd'
import { gitHubRepository, upstreamRepository } from '../../constants'
import { useI18n } from '../../i18n'

export default function CreditsPage() {
  const { locale } = useI18n()
  return <Typography>{locale === 'zh-Hans' ? <Chinese /> : <English />}</Typography>
}

function Chinese() {
  return (
    <>
      <h1>致谢</h1>

      <h2>本分支</h2>
      <p>
        PKHeX Web 中文版是{' '}
        <a href={upstreamRepository} target="_blank">
          PKHeX.Everywhere
        </a>{' '}
        的非官方中文分支，源码在{' '}
        <a href={gitHubRepository} target="_blank">
          GitHub
        </a>{' '}
        上，遵循 GPL-3.0-or-later。上游作者与本项目没有隶属关系，也未为本分支背书。
      </p>

      <h2>PKHeX.Core</h2>
      <p>
        本应用基于 <a href="https://github.com/kwsch/PKHeX" target="_blank">PKHeX.Core</a> 构建。特别感谢{' '}
        <a href="https://github.com/kwsch" target="_blank">Kurt</a> 的长期维护。
      </p>

      <h2>PokeAPI/sprites</h2>
      <p>
        所有图片资源来自 <a href="https://github.com/PokeAPI/sprites" target="_blank">PokeAPI/sprites</a>。
      </p>

      <h2>PKHeX-Plugins</h2>
      <p>
        感谢 <a href="https://github.com/santacrab2" target="_blank">santacrab2</a> 维护的{' '}
        <a href="https://github.com/santacrab2/PKHeX-Plugins" target="_blank">PKHeX-Plugins</a> 分支，其中包含自动合法性模式。
      </p>

      <h2>OpenHome</h2>
      <p>
        Pokémon Unbound 与 Radical Red 的物种、道具和招式数据来自{' '}
        <a href="https://github.com/andrewbenington/OpenHome" target="_blank">OpenHome</a>，作者{' '}
        <a href="https://github.com/andrewbenington" target="_blank">Andrew Benington</a>。
      </p>

      <h2>中文名称数据</h2>
      <p>宝可梦、道具、招式等中文名称取自 PKHeX.Core 自带的简体中文本地化资源。</p>
    </>
  )
}

function English() {
  return (
    <>
      <h1>Credits</h1>

      <h2>This fork</h2>
      <p>
        PKHeX Web CN is an unofficial Chinese fork of{' '}
        <a href={upstreamRepository} target="_blank">
          PKHeX.Everywhere
        </a>
        . The source is on{' '}
        <a href={gitHubRepository} target="_blank">
          GitHub
        </a>{' '}
        and licensed under GPL-3.0-or-later. It is not affiliated with, or endorsed by, the upstream authors.
      </p>

      <h2>PKHeX.Core</h2>
      <p>
        This app is built on the foundation of{' '}
        <a href="https://github.com/kwsch/PKHeX" target="_blank">PKHeX.Core</a>. Special thanks to{' '}
        <a href="https://github.com/kwsch" target="_blank">Kurt</a> for maintaining it.
      </p>

      <h2>PokeAPI/sprites</h2>
      <p>
        All image resources are taken from{' '}
        <a href="https://github.com/PokeAPI/sprites" target="_blank">PokeAPI/sprites</a>.
      </p>

      <h2>PKHeX-Plugins</h2>
      <p>
        Special thanks to <a href="https://github.com/santacrab2" target="_blank">santacrab2</a> for maintaining the{' '}
        <a href="https://github.com/santacrab2/PKHeX-Plugins" target="_blank">PKHeX-Plugins</a> fork, which includes the
        Auto-Legality mode.
      </p>

      <h2>OpenHome</h2>
      <p>
        The Pokémon Unbound and Radical Red species, item and move data comes from{' '}
        <a href="https://github.com/andrewbenington/OpenHome" target="_blank">OpenHome</a> by{' '}
        <a href="https://github.com/andrewbenington" target="_blank">Andrew Benington</a>.
      </p>

      <h2>Chinese names</h2>
      <p>Chinese species, item and move names come from the Simplified Chinese resources shipped with PKHeX.Core.</p>
    </>
  )
}
