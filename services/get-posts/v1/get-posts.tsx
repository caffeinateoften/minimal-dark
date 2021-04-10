import { PostProps } from '../../../lib/components/post/v1/post'

export function getPosts(): PostProps[] {
    return [
        {
            id: '3',
            title: 'Maximizing Freedom for the Uncertain Technocrat',
            content: 'TODO'
        },
        {
            id: '2',
            title: 'The Freedom Test',
            content: 'TODO'
        },
        {
            id: '1',
            title: 'Welcome',
            content: 'This is the personal site of the one and only caffeine king. Posts will consist of random trash.'
        }
    ]
}
