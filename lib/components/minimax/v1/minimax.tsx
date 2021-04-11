import { Column, Table } from "@blueprintjs/table";
import '@blueprintjs/table/lib/css/table.css'

export interface MinimaxProps {

}

export function Minimax(props: MinimaxProps) {
    return (
        <Table numRows={5}>
            <Column />
            <Column />
            <Column />
        </Table>
    )
}