import { useMemo, useState } from "react";
import { FinancialRecord, useFinancialRecords } from "../../contexts/financial-record-context";
import {useTable, Column,CellProps, Row} from "react-table"

interface EditableCellProps extends CellProps<FinancialRecord>{
    updateRecord: (rowIndex: number,columnId: string, value: any) => void
    editable:boolean
}

const EditableCell: React.FC<EditableCellProps> = ({value: initialValue, row, column, updateRecord,editable}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value,setValue] = useState(initialValue)

    
}
export const FinancialRecordList =() => {
    const {records} = useFinancialRecords()

    const columns : Array<Column<FinancialRecord>> = useMemo(() => [
        {
           Header: "Description",
           accessor: "description",
           cell: () => () 
        }
    ])

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data:records,
    })
    return <div className="table-container">
        <table {...getTableProps()} className="table">
            <thead>
                {headerGroups.map((hg) => (
                    <tr {...hg.getHeaderGroupProps()}>
                        {hg.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, idx) => {
                    prepareRow(row)
                    return <tr {...row.getRowProps()}>{row.cells.map((cell) => (
                        <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                        </td>
                    ))}</tr>
                })}
            </tbody>
        </table>
    </div>;
}