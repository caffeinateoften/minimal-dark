import { useRouter } from 'next/router'
import { Post } from '../../lib/components/post/v1/post'
import { getPosts } from '../../services/get-posts/v1/get-posts'

export default function PostPage() {
    const router = useRouter();
    const postId = router.query.id;

    const post = getPosts().find(post => post.id === postId);

    return (
        <Post {...post} />
    )
}