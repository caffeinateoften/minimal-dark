import Link from 'next/link'
import { PostProps } from '../../post/v1/post'
import { List } from '../../list/v1/list'

export interface PostListProps {
    posts: PostProps[]
}

export function PostList(props: PostListProps) {
    return (
        <List
            data={props.posts}
            renderItem={(post) => (
                <Link href={`posts/${post.id}`}>
                    <div className="post__feed-panel">
                        <style jsx>{`
                        .post__feed-panel {
                            cursor: pointer;
                            line-height: 46px;
                            box-shadow: 0px 0px .5px 0px black;
                            background-color: white;
                            margin-bottom: 5px;
                            padding-left: 16px;
                        }
                        .post__feed-panel:hover {
                            background-color: #F8F8F8;
                        }
                    `}</style>
                        {post.title}
                    </div>
                </Link>
            )}
        />
    )
}