import { useRouter } from 'next/router'
import { Post } from '../../lib/components/post/v2/post'
import { getPosts } from '../../services/get-posts/v2/get-posts'

export default function PostPage() {
    const router = useRouter();
    const postId = router.query.id;

    const post = getPosts().find(post => post.id === postId);

    return (
        <Post {...post} />
    )
}