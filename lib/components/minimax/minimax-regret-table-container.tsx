import { MinimaxTable, MinimaxTableProps } from './v1/minimax'

const data: MinimaxTableProps = {
    columnNames: ['Choices', 'Event A', 'Event B', 'Event C'],
    sparseCellData: {
        '0-0': 'Choice 1',
        '1-0': 'Choice 2',
        '2-0': 'Choice 3',

        '0-1': '40',
        '1-1': '70',
        '2-1': '53',

        '0-2': '45',
        '1-2': '30',
        '2-2': '45',

        '0-3': '5',
        '1-3': '-13',
        '2-3': '5'
    },
    sparseCellIntent: {
        
    },
    sparseColumnIntents: [],
}

export const MinimaxRegretTableContainer: React.FC<any> = () => <MinimaxTable {...data} />