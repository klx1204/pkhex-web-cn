import { Typography } from 'antd'
import { applicationName, gitHubRepositoryIssues } from '../../constants'

export default function PrivacyPolicyPage() {
  return (
    <Typography>
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
    </Typography>
  )
}
