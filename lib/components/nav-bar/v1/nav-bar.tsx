import Link from 'next/link'

import {
    Alignment,
    Button,
    Classes,
    Navbar,
    NavbarDivider,
    NavbarGroup,
    NavbarHeading,
    IconName
} from "@blueprintjs/core";

interface NavItem {
    text: string
    icon: IconName
}

export interface NavBarProps {
    heading: React.ReactNode
    navItems: NavItem[]
}

export function NavBar(props: NavBarProps) {
    return (
        <Navbar>
            <NavbarGroup align={Alignment.RIGHT}>
                <NavbarHeading>{props.heading}</NavbarHeading>
                <NavbarDivider />
                {props.navItems.map(navItem => (<Link href="/"><Button key={navItem.text} className={Classes.MINIMAL} {...navItem} /></Link>))}
            </NavbarGroup>
        </Navbar>
    )
}

