import {
    H2
} from '@blueprintjs/core'

export interface HeadingProps {
    children: React.ReactNode
}

export function Heading(props: HeadingProps){
    return (
        <H2>
            {props.children}
        </H2>
    )
}