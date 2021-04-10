import { PostProps } from '../../../lib/components/post/v2/post'

export function getPosts(): PostProps[] {
    return [
        {
            id: '5',
            title: 'Minimizing Loss of Freedom for the Uncertain Future of a Technocrat',
            subtitle: 'Given uncertainty, how do I minimize loss of my freedom?',
            content: 'TODO'
        },
        {
            id: '4',
            title: 'What is a Technocrat?',
            subtitle: 'Am I this?',
            content: 'TODO'
        },
        {
            id: '3',
            title: 'Minimax: How to minimize regret',
            subtitle: 'Given uncertainty, how do I minimize loss?',
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
            subtitle: 'Hello, Friend.',
            content: 'This is the personal site of the one and only caffeine king. Posts will consist of random trash.'
        }
    ]
}
