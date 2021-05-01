import { PostProps } from '../../../lib/components/post/v2/post'

import { Freedom } from '../../../lib/components/freedom/v1/freedom'
import { MinimaxIntroPostContainer } from '../../../lib/components/minimax/minimax-intro-post-container'
import { DiligentWriter } from '../../../lib/components/diligent-writer/v1/diligent-writer'

export function getPosts(): PostProps[] {
    return [
        /*{
            id: '13',
            title: 'Ability: The Key Ingredient to motivation, satisfaction, trust, and freedom',
            subtitle: '',
            content: 'TODO',
            placeholder: true
        },
        {
            id: '12',
            title: 'Motivation: Autonomy, Purpose, and Ability',
            subtitle: '',
            content: 'TODO',
            placeholder: true
        },
        {
            id: '11',
            title: 'Which is worse: The existence of a Taker or the Absence of a Giver?',
            subtitle: 'Minimax\'ing Givers and Takers',
            content: 'TODO',
            placeholder: true
        },
        {
            id: '10',
            title: 'Persona Types: Giver, Matcher, Taker',
            subtitle: 'When do people exchange value?',
            content: 'TODO',
            placeholder: true
        },
        {
            id: '9',
            title: 'What is a "Gift" culture?',
            subtitle: 'When does focus shift towards generating and exchanging reputation instead of explicit money?',
            content: 'TODO',
            placeholder: true
        },
        {
            id: '8',
            title: 'What is value?',
            subtitle: 'Money? Reputation? Freedom? All of the above?',
            content: 'TODO',
            placeholder: true
        },
        {
            id: '7',
            title: 'What is Trust?',
            subtitle: 'How to trust others and how to be trust worthy?',
            content: 'Benevolence, Integrity, and Ability',
            placeholder: true
        },
        {
            id: '6',
            title: 'Specialization and Trade',
            subtitle: 'Should we work together?',
            content: 'TODO',
            placeholder: true
        },
        {
            id: '5',
            title: 'Minimizing Loss of Freedom for the Uncertain Future of a Technocrat',
            subtitle: 'Given uncertainty, how do I minimize loss of my freedom?',
            content: 'TODO',
            placeholder: true
        },*/
        {
            id: '4',
            title: 'What is a Technocrat?',
            subtitle: '',
            content: 'TODO',
            placeholder: true
        },
        {
            id: '3',
            title: 'Minimax: How to minimize regret',
            subtitle: 'Given uncertainty, how do I minimize loss?',
            content: <MinimaxIntroPostContainer />,
            placeholder: false
        },
        {
            id: '2',
            title: 'The Freedom Test',
            subtitle: 'Do you have freedom',
            content: <Freedom />
        },
        {
            id: '1',
            title: 'How does a diligent writer write a sentence?',
            subtitle: '"...if thought corrupts language, language can also corrupt thought." - George Orwell',
            content: <DiligentWriter />
        },
        {
            id: '0',
            title: 'Welcome',
            subtitle: 'Hello, Friend.',
            content: 'This is the personal site of the one and only caffeine king. Posts will consist of random trash.'
        },
    ]
}
