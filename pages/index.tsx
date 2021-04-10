import { Heading } from '../lib/components/heading/v1/heading'
import { PostList } from '../lib/components/post-list/v1/post-list'
import { getPosts } from '../services/get-posts/v1/get-posts'

import { List } from '../lib/components/list/v1/list'

export default function Home() {
  return (
    <List
      data={
        [
          <Heading>Latest</Heading>,
          <PostList posts={getPosts()}></PostList>
        ]}
      renderItem={((item) => item)}
    />
  )
}
