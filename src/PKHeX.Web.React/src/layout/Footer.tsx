import { Flex, Layout } from 'antd'
import { Link } from 'react-router'
import { applicationName, applicationNameEn, gitHubRepository, upstreamRepository } from '../constants'
import { routes } from '../routes'

export function Footer() {
  return (
    <Layout.Footer style={{ textAlign: 'center' }}>
      <p>
        {applicationName} · 基于{' '}
        <a href={upstreamRepository} target="_blank">
          PKHeX.Everywhere
        </a>{' '}
        的非官方中文分支
      </p>
      <p>
        {applicationNameEn} · An unofficial Chinese fork of PKHeX.Everywhere. Not affiliated with PKHeX or its authors.
      </p>
      <p>
        Issues or feedback on{' '}
        <a href={gitHubRepository} target="_blank">
          GitHub
        </a>
      </p>
      <Flex wrap justify="center" gap="8px 16px">
        <Link to={routes.privacyPolicy}>Privacy Policy</Link>
        <Link to={routes.termsOfUse}>Terms of Use</Link>
        <Link to={routes.credits}>Credits</Link>
        <Link to={routes.releaseNotes()}>Release Notes</Link>
      </Flex>
    </Layout.Footer>
  )
}
