import { PostProps } from '../../../lib/components/post/v2/post'

export function getPosts(): PostProps[] {
    return [
        {
            id: '3',
            title: 'Maximizing Freedom for the Uncertain Technocrat',
            subtitle: 'Enable current self to remain uncommitted while optimizing for first instance of future self that would like to commit',
            content: 'TODO'
        },
        {
            id: '2',
            title: 'The Freedom Test',
            subtitle: 'Am I free?',
            content: 'TODO'
        },
        {
            id: '1',
            title: 'Welcome',
            subtitle: '',
            content: 'This is the personal site of the one and only caffeine king. Posts will consist of random trash.'
        }
    ]
}
