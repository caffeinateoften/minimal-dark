import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";

import type { AppProps } from 'next/app'
import Link from 'next/link'

import { NavBar, NavBarProps } from '../lib/components/nav-bar/v1/nav-bar'
import { PageLayout } from '../lib/components/page-layout/v1/page-layout'
import { Logo } from '../lib/components/logo/v1/logo'

const navBarData: NavBarProps = {
  heading: <Logo text="CaffeinateOften.com" />,
  navItems: [
    {
      text: 'Home',
      icon: 'home'
    }
  ]
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageLayout header={<NavBar {...navBarData} />}>
      <Component {...pageProps} />
    </PageLayout>
  )
}

export default MyApp
