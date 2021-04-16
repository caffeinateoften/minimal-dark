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
        for (let row = 0; row < 3; row++) {
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

interface MinimaxTablesState {
    payoffTableCellData: MinimaxTableProps['sparseCellData']
    regretTableCellData: MinimaxTableProps['sparseCellData']
}

export const MinimaxIntroPostContainer: React.FC<any> = () => {

    const [state, setState] = useState<MinimaxTablesState>({
        payoffTableCellData: payoffTableDefaultState.sparseCellData,
        regretTableCellData: regretTableDefaultState.sparseCellData
    });

    return (
        <>
            <h6 style={{ color: 'red' }}>This Page is Under Construction.</h6>
            <Row>
                <Col span={24}>
                    <h2>Payoff Table</h2>
                    <h5>You can edit the cell values below</h5>
                    <MinimaxTable
                        {...payoffTableDefaultState}
                        sparseCellData={state.payoffTableCellData}
                        onCellUpdate={(dataKey, newValue) => {
                            const payoffCells = state.payoffTableCellData;
                            payoffCells[dataKey] = newValue;
                            const regretSparseCellData = createRegretSparseCellData(payoffCells);
                            setState({
                                ...state,
                                regretTableCellData: regretSparseCellData
                            })
                            console.log(state.payoffTableCellData[dataKey])
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
                        onCellUpdate={(dataKey, newValue) => {
                            console.log('regretcell dataKey:', dataKey);
                            console.log('regretcell newValue:', newValue);
                        }}
                    />
                </Col>
            </Row>
        </>
    )
}
