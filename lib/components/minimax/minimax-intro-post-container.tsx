import { useState } from 'react';
import { MinimaxTable, MinimaxTableProps } from './v1/minimax';
import { Row, Col } from 'antd';

const payoffTableDefaultState: Partial<MinimaxTableProps> = {
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
    sparseCellIntent: {},
    sparseColumnIntents: [],
}

const getDataKey = (rowIndex: number, columnIndex: number) => {
    return `${rowIndex}-${columnIndex}`;
};

function createRegretSparseCellData(payoffSparseCellData) {
    const maxColValues = [];

    for (let col = 1; col <= 3; col++) {
        const dataKey = getDataKey(0, col);
        const value = Number(payoffTableDefaultState.sparseCellData[dataKey]);
        let max = value;
        for (let row = 1; row < 3; row++) {
            const dataKey = getDataKey(row, col);
            const value = Number(payoffTableDefaultState.sparseCellData[dataKey]);
            if (value > max) {
                max = value;
            }
        }
        maxColValues.push(max);
    }

    let regretSparseCellData = {}
    for (let col = 1; col <= 3; col++) {
        for (let row = 0; row < 3; row++) {
            const dataKey = getDataKey(row, col);
            regretSparseCellData[dataKey] = maxColValues[col - 1] - Number(payoffTableDefaultState.sparseCellData[dataKey]); // cols are offset by 1
        }
    }

    return regretSparseCellData
}

function createMaxRegretCellData(regretSparseCellData) {
    const maxValues = []
    for (let row = 0; row < 3; row++) {
        const dataKey = getDataKey(row, 1);
        const value = regretSparseCellData[dataKey]
        let max = value;
        for (let col = 2; col <= 3; col++) {
            const dataKey = getDataKey(row, col);
            const value = regretSparseCellData[dataKey]
            if (value > max) {
                max = value;
            }
        }
        maxValues.push(max);
    }

    const cellData = {
        '0-1': maxValues[0],
        '1-1': maxValues[1],
        '2-1': maxValues[2]
    }
    console.log('max regret cell data:', cellData);
    return cellData
}

// regret table
const regretSparseCellData = createRegretSparseCellData(payoffTableDefaultState);
const regretTableDefaultState: Partial<MinimaxTableProps> = {
    columnNames: ['Choices', 'Event A', 'Event B', 'Event C'],
    sparseCellData: {
        '0-0': 'Choice 1',
        '1-0': 'Choice 2',
        '2-0': 'Choice 3'
    },
    sparseCellIntent: {},
    sparseColumnIntents: [],
}
regretTableDefaultState.sparseCellData = { ...regretTableDefaultState.sparseCellData, ...regretSparseCellData }

// maximum regret per choice table
const maximumRegretsDefaultState: Partial<MinimaxTableProps> = {
    columnNames: ['Choices', 'Maximum Regret'],
    sparseCellData: {
        '0-0': 'Choice 1',
        '1-0': 'Choice 2',
        '2-0': 'Choice 3'
    },
    sparseCellIntent: {},
    sparseColumnIntents: [],
}
const maxRegretCellData = createMaxRegretCellData(regretSparseCellData)

maximumRegretsDefaultState.sparseCellData = { ...maximumRegretsDefaultState.sparseCellData, ...maxRegretCellData }


interface MinimaxTablesState {
    payoffTableCellData: MinimaxTableProps['sparseCellData']
    regretTableCellData: MinimaxTableProps['sparseCellData']
    maximumRegretCellData: MinimaxTableProps['sparseCellData']
}

export const MinimaxIntroPostContainer: React.FC<any> = () => {

    const [state, setState] = useState<MinimaxTablesState>({
        payoffTableCellData: payoffTableDefaultState.sparseCellData,
        regretTableCellData: regretTableDefaultState.sparseCellData,
        maximumRegretCellData: maximumRegretsDefaultState.sparseCellData
    });

    return (
        <div style={{ color: 'rgb(156, 132, 107)' }}>
            <h6 style={{ color: 'red' }}>This Page is Under Construction.</h6>
            <Row>
                <Col span={24}>
                    <h2>Payoff Table</h2>
                    <h5>You can edit the cell values below</h5>
                    <MinimaxTable
                        {...payoffTableDefaultState}
                        sparseCellData={state.payoffTableCellData}
                        onCellUpdate={(dataKey, newValue) => {
                            if (!isNaN(newValue as any)) {
                                const payoffCells = state.payoffTableCellData;
                                payoffCells[dataKey] = newValue;
                                const regretSparseCellData = createRegretSparseCellData(payoffCells);
                                const maxRegretCellData = createMaxRegretCellData(regretSparseCellData)
                                setState({
                                    ...state,
                                    regretTableCellData: {
                                        ...regretTableDefaultState.sparseCellData,
                                        ...regretSparseCellData
                                    },
                                    maximumRegretCellData: {
                                        ...maximumRegretsDefaultState.sparseCellData,
                                        ...maxRegretCellData
                                    }
                                })
                                console.log(state.payoffTableCellData[dataKey])
                            }

                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <h2>Regret Table</h2>
                    <MinimaxTable
                        {...regretTableDefaultState}
                        sparseCellData={state.regretTableCellData}
                        onCellUpdate={() => { }}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <h2>Maxium Regrets Per Choice</h2>
                    <MinimaxTable
                        {...maximumRegretsDefaultState}
                        sparseCellData={state.maximumRegretCellData}
                        onCellUpdate={() => { }}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <h2>Best choice to minimize regret:</h2>
                    <h1 style={{ fontWeight: 900 }}>
                        {getMinimumRegretChoice(state.maximumRegretCellData)}
                    </h1>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <blockquote>
                        <i>“The value of any commodity, therefore, to the person who possesses it,
                        and who means not to use or consume it himself,
                        but to exchange it for other commodities, is equal to the quantity of labour
                        which it enables him to purchase or command. Labour, therefore, is the real
                        measure of the exchangeable value of all commodities. The real price of everything,
                        what everything really costs to the man who wants to acquire it, is the toil
                            and trouble of acquiring it.” - Smith, Adam. Wealth of Nations. </i> <br />
                    </blockquote>
                </Col>
            </Row>
            <br/>
            <Row>
                <Col>
                    <ul style={{ color: 'black' }}>
                        <li>
                            As soon as any information is provided such that one could attach probability to likelihood of an event occurring, then this approach needs to be extended to find an optimal choice.
                        </li>
                        <li>
                            Q to ask self: What amount of effort is worth my time to acquire information which enables me to accurately attach probabilities to a set of possible events?
                        </li>
                    </ul>
                </Col>
            </Row>
        </div>
    )
}

function getMinimumRegretChoice(maximumRegretCellData) {
    let bestChoiceDataKey;
    let min;

    Object.entries(maximumRegretCellData).map(([key, value]) => {
        if (typeof value === 'number') {
            if (typeof min === 'undefined' || value < min) {
                bestChoiceDataKey = key;
                min = value;
            }
        }
    });

    let colValueToTheLeft = String(bestChoiceDataKey.slice(0, 2)) + (Number(bestChoiceDataKey[2]) - 1)
    return maximumRegretCellData[colValueToTheLeft];
}

