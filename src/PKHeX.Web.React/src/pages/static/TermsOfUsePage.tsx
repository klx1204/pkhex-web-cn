import { Typography } from 'antd'
import { applicationName, applicationNameEn, gitHubRepositoryIssues } from '../../constants'
import { useI18n } from '../../i18n'

export default function TermsOfUsePage() {
  const { locale } = useI18n()
  return <Typography>{locale === 'zh-Hans' ? <Chinese /> : <English />}</Typography>
}

function Chinese() {
  return (
    <>
      <h1>使用条款</h1>
      <p>生效日期：2026-10-28</p>

      <h2>1. 说明</h2>
      <p>
        欢迎使用 {applicationName}。使用本应用即表示你同意这些条款；如果不同意，请不要使用。
      </p>

      <h2>2. 使用方式</h2>
      <p>
        本应用用于编辑宝可梦游戏存档和安装插件。你需要为自己的使用行为及其后果负责。我们不支持把修改后的存档用于对战比赛或其他不公平用途，请合理使用。
      </p>

      <h2>3. 插件</h2>
      <p>
        本应用支持安装插件。出于安全和兼容性考虑，建议只使用默认来源的插件。第三方插件如何使用数据、以及由此产生的问题，由插件作者和安装者负责。
      </p>

      <h2>4. 免责声明</h2>
      <p>
        本应用按“现状”提供，不附带任何形式的担保。我们会尽力保持更新并修复问题，但不保证应用没有错误、病毒或其他有害内容。
      </p>

      <h2>5. 责任限制</h2>
      <p>
        对于使用本应用造成的任何损失或损坏（包括存档损坏），我们不承担责任。使用前请务必自行备份存档。
      </p>

      <h2>6. 条款变更</h2>
      <p>我们可能不时更新这些条款。变更会在本页发布后生效，建议你定期查看。</p>

      <h2>7. 联系方式</h2>
      <p>
        如对条款有疑问，请在{' '}
        <a href={gitHubRepositoryIssues} target="_blank">
          GitHub
        </a>{' '}
        上提问。
      </p>
    </>
  )
}

function English() {
  return (
    <>
      <h1>Terms of Use</h1>
      <p>Effective Date: 2026-10-28</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to {applicationNameEn}. By using this web application, you agree to these Terms of Use. If you do not
        agree to these terms, please do not use the app.
      </p>

      <h2>2. Use of the App</h2>
      <p>
        The app allows you to edit Pokémon game save files and install plugins. You are responsible for your use of the
        app and for any consequences thereof. We condemn the practice of hacking for competitions or any other use other
        than the use of your own, so please use the app responsibly.
      </p>

      <h2>3. Plugins</h2>
      <p>
        The app supports the installation of plugins. It is advisable to use plugins from the "Default Source" for
        security and compatibility reasons. We are not responsible for any third-party plugin use of the data or any
        issues arising from the use of such plugins.
      </p>

      <h2>4. No Warranty</h2>
      <p>
        The app is provided "as is" without any warranties of any kind. Although we do our best effort to keep it
        up-to-date and fix arising issues, we do not guarantee that the app will be free from errors, viruses, or other
        harmful components.
      </p>

      <h2>5. Limitation of Liability</h2>
      <p>
        We are not responsible for any loss or damage that may occur from using the app, including but not limited to
        game save corruption. It is strongly advised that you keep your own backup of any game save files before using
        the app.
      </p>

      <h2>6. Changes to the Terms</h2>
      <p>
        We may update these Terms of Use from time to time. Changes take effect when they are posted on this page, so
        please review this page periodically.
      </p>

      <h2>7. Contact Us</h2>
      <p>
        If you have any questions about these terms, please open an issue on{' '}
        <a href={gitHubRepositoryIssues} target="_blank">
          GitHub
        </a>
        .
      </p>
    </>
  )
}
