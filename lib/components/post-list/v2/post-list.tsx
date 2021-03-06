import Link from 'next/link'
import { PostProps } from '../../post/v2/post';
import { List } from '../../list/v1/list';

import { ArrayElement } from '../../../type-magic/array-element';

import { Tag } from '@blueprintjs/core'

export interface PostListProps {
    posts: PostProps[]
}

export function PostList(props: PostListProps) {
    return (
        <List
            data={props.posts}
            renderItem={(post: ArrayElement<PostListProps['posts']>) => (
                <Link key={post.id} href={`posts/${post.id}`}>
                    <div key={post.id} className="post__feed-panel">
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
                            .post__feed-panel__tooltip {
                                pointer-events: none;
                                width: 100%;
                            }
                            .post__feed-panel__tag {
                                float: right;
                                padding-right: 1vw;
                            }
                    `}</style>
                        {post.title}
                        <span className="post__feed-panel__tag">{post.placeholder ? <Tag minimal>placeholder</Tag> : ''}</span>
                    </div>
                </Link>
            )}
        />
    )
}