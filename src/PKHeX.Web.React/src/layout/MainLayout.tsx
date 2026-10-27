import { Suspense, type ReactNode } from 'react'
import {
  ApiOutlined,
  FlagOutlined,
  HomeOutlined,
  InboxOutlined,
  LineChartOutlined,
  SaveOutlined,
  SettingOutlined,
  ShopOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu, Space, type MenuProps } from 'antd'
import { Link, useLocation } from 'react-router'
import { useLoadedGame, useQuery } from '@pkhex-everywhere/react'
import { changeLocale, changeTheme, useLocale, useNavigate, useTheme } from '../host'
import { useT } from '../i18n'
import { routes } from '../routes'
import { Footer } from './Footer'
import { RoutedContent } from './RoutedContent'
import { menuEntries, type MenuEntry, type MenuIcon } from './menu'
import { NewsBanner } from './NewsBanner'

const icons: Record<MenuIcon, ReactNode> = {
  home: <HomeOutlined />,
  team: <TeamOutlined />,
  inbox: <InboxOutlined />,
  shop: <ShopOutlined />,
  flag: <FlagOutlined />,
  api: <ApiOutlined />,
  'line-chart': <LineChartOutlined />,
  save: <SaveOutlined />,
}

type MenuItem = Required<MenuProps>['items'][number]

function toMenuItem({ route, label, icon, children }: MenuEntry, t: (text: string) => string): MenuItem {
  if (children) {
    return {
      key: `${route}#group`,
      icon: icon && icons[icon],
      label: t(label),
      children: children.map((child) => toMenuItem(child, t)),
    }
  }
  return { key: route, icon: icon && icons[icon], label: <Link to={route}>{t(label)}</Link> }
}

function SideMenu() {
  const { pathname } = useLocation()
  const { game } = useLoadedGame()
  const installed = useQuery('plugins.installed')
  const t = useT()

  return (
    <Menu
      theme="light"
      mode="inline"
      selectedKeys={[pathname]}
      items={menuEntries(game, installed).map((entry) => toMenuItem(entry, t))}
    />
  )
}

export function MainLayout() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const locale = useLocale()
  const theme = useTheme()
  const t = useT()

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <NewsBanner />
      <Layout.Sider
        theme="light"
        collapsible
        breakpoint="lg"
        collapsedWidth={64}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'auto',
          background: 'var(--pkm-card)',
          borderRight: '1px solid var(--pkm-line)',
        }}
      >
        <div
          style={{
            padding: '18px 12px 10px',
            textAlign: 'center',
            fontWeight: 600,
            fontSize: 14,
            color: 'var(--pkm-text)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {locale === 'zh-Hans' ? 'PKHeX Web 中文版' : 'PKHeX Web CN'}
        </div>
        <Suspense fallback={null}>
          <SideMenu />
        </Suspense>
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            background: 'var(--pkm-card)',
            borderBottom: '1px solid var(--pkm-line)',
          }}
        >
          <div style={{ flexGrow: 1 }} />
          <Space>
            <Button size="large" onClick={() => changeLocale(locale === 'zh-Hans' ? 'en' : 'zh-Hans')}>
              {locale === 'zh-Hans' ? 'EN' : '中文'}
            </Button>
            <Button
              size="large"
              shape="round"
              aria-label={t('Toggle theme')}
              title={t('Toggle theme')}
              onClick={() => changeTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              ◐
            </Button>
            <Button
              icon={<SettingOutlined />}
              size="large"
              shape="round"
              aria-label="Settings"
              onClick={() => navigate(routes.settings)}
            />
          </Space>
        </Layout.Header>
        <Layout.Content style={{ margin: '24px 24px 0' }}>
          <div style={{ maxWidth: 1180, margin: '0 auto', padding: '8px 0 24px', minHeight: 360 }}>
            <RoutedContent key={pathname} />
          </div>
        </Layout.Content>
        <Footer />
      </Layout>
    </Layout>
  )
}
