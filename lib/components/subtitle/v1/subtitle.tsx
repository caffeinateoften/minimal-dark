import {
    H6
} from '@blueprintjs/core'

export interface SubtitleProps {
    children: React.ReactNode
}

export function Subtitle(props: SubtitleProps) {
    return (
        <H6>
            {props.children}
        </H6>
    )
}