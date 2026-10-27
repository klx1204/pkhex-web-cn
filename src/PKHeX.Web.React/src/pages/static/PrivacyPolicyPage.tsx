import { Typography } from 'antd'
import { applicationName, applicationNameEn, gitHubRepositoryIssues } from '../../constants'
import { useI18n } from '../../i18n'

export default function PrivacyPolicyPage() {
  const { locale } = useI18n()
  return <Typography>{locale === 'zh-Hans' ? <Chinese /> : <English />}</Typography>
}

function Chinese() {
  return (
    <>
      <h1>隐私政策</h1>
      <p>生效日期：2026-10-28</p>

      <h2>1. 概述</h2>
      <p>
        {applicationName} 是一个在浏览器里运行的宝可梦存档编辑器。所有存档解析和编辑都在你的设备上完成，本应用没有后端服务器。
      </p>

      <h2>2. 存档文件</h2>
      <p>
        你打开或拖入的存档只在浏览器内存中解析，不会被上传。只有当你点击“导出”时，文件才会由浏览器下载到本地。关闭或刷新页面后，内存中的存档就会消失。
      </p>

      <h2>3. 本地存储</h2>
      <p>
        应用使用浏览器的 localStorage 和 IndexedDB 保存少量本机数据：主题、语言、伤害计算器地址、已安装插件及其缓存。这些数据不会离开你的设备，你可以通过清除本站的站点数据随时删除。
      </p>

      <h2>4. 我们不收集的数据</h2>
      <p>
        本分支不包含任何第三方统计、错误上报或广告脚本，也不会创建用于追踪的分析 Cookie。因此这里没有 Cookie 同意横幅，也没有需要你撤回的授权。
      </p>

      <h2>5. 插件</h2>
      <p>
        你可以安装社区插件，插件同样在本地运行。第三方插件如何使用数据由插件作者决定，请只安装你信任的来源。
      </p>

      <h2>6. 外部链接</h2>
      <p>
        页面中包含指向 GitHub 等外部网站的链接。离开本站后，那些网站各自的隐私政策适用。
      </p>

      <h2>7. 政策变更</h2>
      <p>如果本政策发生重大变化，我们会更新本页顶部的生效日期，并在更新日志中说明。</p>

      <h2>8. 联系方式</h2>
      <p>
        如有疑问，请在{' '}
        <a href={gitHubRepositoryIssues} target="_blank">
          GitHub Issues
        </a>{' '}
        提问。
      </p>
    </>
  )
}

function English() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p>Effective date: 2026-10-28</p>

      <h2>1. Overview</h2>
      <p>
        {applicationNameEn} is a Pokémon save editor that runs in your browser. Every save is parsed and edited on your
        device; the app has no backend server.
      </p>

      <h2>2. Save files</h2>
      <p>
        A save you open or drop is parsed in memory and never uploaded. A file only reaches your disk when you choose to
        export it. Closing or reloading the page discards it.
      </p>

      <h2>3. Local storage</h2>
      <p>
        The app keeps a few values in localStorage and IndexedDB: theme, language, the damage calculator URL, installed
        plug-ins and their caches. None of it leaves your device, and clearing this site's data removes it.
      </p>

      <h2>4. What we do not collect</h2>
      <p>
        This fork ships without third-party analytics, error reporting or advertising scripts, and sets no tracking
        cookies. There is therefore no cookie banner and nothing to revoke.
      </p>

      <h2>5. Plug-ins</h2>
      <p>
        You can install community plug-ins, which also run locally. How a third-party plug-in handles data is up to its
        author; install only sources you trust.
      </p>

      <h2>6. External links</h2>
      <p>
        Pages link to external sites such as GitHub. Once you leave this site, those sites' own privacy policies apply.
      </p>

      <h2>7. Changes</h2>
      <p>
        If this policy changes materially, the effective date at the top of this page is updated and the change is
        noted in the release notes.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions are welcome on{' '}
        <a href={gitHubRepositoryIssues} target="_blank">
          GitHub Issues
        </a>
        .
      </p>
    </>
  )
}
