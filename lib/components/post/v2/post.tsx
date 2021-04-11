import { Breadcrumb } from '@blueprintjs/core'
import { Heading } from '../../heading/v1/heading'
import { Subtitle } from '../../subtitle/v1/subtitle'

export interface PostProps {
    id: string
    title: string
    subtitle: string
    content: React.ReactNode
    placeholder?: boolean
}

export function Post(props: PostProps) {
    return (
        <div>
            <style global jsx>{`
                .single-post__breadcrumb {
                    font-size: 12px;
                }
            `}</style>
            <Breadcrumb className="single-post__breadcrumb" href="/">{`< `}Back</Breadcrumb>
            <Heading>
                {props.title}
            </Heading>
            <Subtitle>
                {props.subtitle}
            </Subtitle>
            <div>
                {props.content}
            </div>
        </div>
    )
}