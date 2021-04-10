import { PostProps } from '../../../lib/components/post/v1/post'

export function getPosts(): PostProps[] {
    return [
        {
            id: '1',
            title: 'Welcome',
            content: 'This is the personal site of the one and only caffeine king.'
        }
    ]
}
