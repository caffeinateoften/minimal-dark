import { Heading } from '../lib/components/heading/v1/heading'
import { PostList } from '../lib/components/post-list/v2/post-list'
import { getPosts } from '../services/get-posts/v2/get-posts'

import { List } from '../lib/components/list/v1/list'

export default function Home() {
  return (
    <List
      data={
        [
          <Heading>Latest</Heading>,
          <PostList posts={getPosts()}></PostList>
        ]}
        // TODO: use antd grid system instead of this terrible List component
      renderItem={((item) => item)}
    />
  )
}
