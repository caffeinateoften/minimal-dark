import { Column, Table, EditableCell } from "@blueprintjs/table";
import '@blueprintjs/table/lib/css/table.css'

export interface MinimaxProps {

}

export function Minimax(props: MinimaxProps) {

    const cellRenderer = (rowIndex: number) => {
        return <EditableCell></EditableCell>
    };

    return (
        <Table numRows={3}>
            <Column name="Choices" cellRenderer={cellRenderer} />
            <Column name="Event A" cellRenderer={cellRenderer} />
            <Column name="Event B" cellRenderer={cellRenderer} />
            <Column name="Event C" cellRenderer={cellRenderer} />
        </Table>
    )
}