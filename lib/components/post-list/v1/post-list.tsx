import Link from 'next/link'
import { PostProps } from '../../post/v1/post'
import { List } from '../../list/v1/list'
import { InfoCard } from '../../info-card/v1/info-card'

export interface PostListProps {
    posts: PostProps[]
}

export function PostList(props: PostListProps) {
    return (
        <List
            data={props.posts}
            renderItem={(post) => (
                <Link key={post.id} href={`posts/${post.id}`}>
                    <InfoCard interactable={true}>
                        {post.title}
                    </InfoCard>
                </Link>
            )}
        />
    )
}