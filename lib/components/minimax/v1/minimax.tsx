import { useState, useEffect } from 'react'
import { Column, Table, EditableCell, EditableName, ColumnHeaderCell } from "@blueprintjs/table";
import { Intent } from '@blueprintjs/core'

import '@blueprintjs/table/lib/css/table.css'

export interface MinimaxTableProps {
    onCellUpdate: (dataKey: string, newValue: string) => void
    columnNames?: string[];
    sparseCellData?: { [key: string]: string };
    sparseCellIntent?: { [key: string]: Intent };
    sparseColumnIntents?: Intent[];
}

export const MinimaxTable: React.FC<MinimaxTableProps> = (props) => {
    const [state, setState] = useState<MinimaxTableProps>(props)

    useEffect(() => {
        setState({
            ...state,
            sparseCellData: props.sparseCellData
        })
    }, [props.sparseCellData])

    const getDataKey = (rowIndex: number, columnIndex: number) => {
        return `${rowIndex}-${columnIndex}`;
    };

    const setArrayState = function <T>(key: string, index: number, value: T) {
        const values = (state as any)[key].slice() as T[];
        values[index] = value;
        setState({ ...state, [key]: values });
    }

    const setSparseState = function <T>(stateKey: string, dataKey: string, value: T) {
        const stateData = (state as any)[stateKey] as { [key: string]: T };
        const values = { ...stateData, [dataKey]: value };
        setState({ ...state, [stateKey]: values });
    }

    const cellSetter = (rowIndex: number, columnIndex: number) => {
        const dataKey = getDataKey(rowIndex, columnIndex);
        const isValid = columnIndex > 0 ? isValidNumber : isValidValue;
        return (value: string) => {
            const intent = isValid(value) ? null : Intent.DANGER;
            setSparseState("sparseCellData", dataKey, value);
            setSparseState("sparseCellIntent", dataKey, intent);
        };
    };

    const nameValidator = (index: number) => {
        return (name: string) => {
            const intent = isValidValue(name) ? null : Intent.DANGER;
            setArrayState("sparseColumnIntents", index, intent);
            setArrayState("columnNames", index, name);
        };
    };

    const isValidValue = function (value: string) {
        return /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(value);
    }

    const isValidNumber = function (value: string) {
        return /^[0-9]*$/.test(value)
    }

    const cellValidator = (rowIndex: number, columnIndex: number, updatedCb) => {
        const dataKey = getDataKey(rowIndex, columnIndex);
        return (value: string) => {
            const intent = isValidValue(value) ? null : Intent.DANGER;
            setSparseState("sparseCellIntent", dataKey, intent);
            setSparseState("sparseCellData", dataKey, value);
            updatedCb(dataKey, value) // TODO: be less dumb
        };
    };

    const nameSetter = (index: number) => {
        return (name: string) => {
            setArrayState("columnNames", index, name);
        };
    };

    const renderColumnHeader = (columnIndex: number) => {
        const nameRenderer = (name: string) => {
            return (
                <EditableName
                    name={name}
                    intent={state.sparseColumnIntents[columnIndex]}
                    onChange={nameValidator(columnIndex)}
                    onCancel={nameValidator(columnIndex)}
                    onConfirm={nameSetter(columnIndex)}
                />
            );
        };
        return <ColumnHeaderCell name={state.columnNames[columnIndex]} nameRenderer={nameRenderer} />;
    }

    const renderCell = (rowIndex: number, columnIndex: number) => {
        const dataKey = getDataKey(rowIndex, columnIndex);
        const value = state.sparseCellData[dataKey];
        return (
            <EditableCell
                value={value == null ? "" : value}
                intent={state.sparseCellIntent[dataKey]}
                onCancel={cellValidator(rowIndex, columnIndex, props.onCellUpdate)}
                onChange={cellValidator(rowIndex, columnIndex, props.onCellUpdate)}
                onConfirm={cellSetter(rowIndex, columnIndex)}
            />
        )
    }

    const columns = props.columnNames.map((_: string, index: number) => (
        <Column key={index} cellRenderer={renderCell} columnHeaderCellRenderer={renderColumnHeader} />
    ))

    return (
        <Table numRows={3}>{columns}</Table>
    )
}
