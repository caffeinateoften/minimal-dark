import { PostProps } from '../../../lib/components/post/v1/post'

export function getPosts(): PostProps[] {
    return [
        {
            id: '1',
            title: 'Welcome',
            content: 'This is my personal site. I may post stuff here. I may not. We will see.'
        }
    ]
}
