import { Text, Breadcrumb, Icon } from '@blueprintjs/core'
import { Heading } from '../../heading/v1/heading'

export interface PostProps {
    id: string
    title: string
    content: string
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
            <Text>
                {props.content}
            </Text>
        </div>
    )
}