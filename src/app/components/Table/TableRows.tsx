import React from 'react'
import { TableProps } from "./Table";
import TableRow from "./TableRow";

const TableRows = <T,>({ data, columns, rowClassNamesSetter }: TableProps<T>): JSX.Element => {

	return (
		<tbody>
			{Array.isArray(data) && data.map((row) => (
				<TableRow key={JSON.stringify(row)}
					row={row} columns={columns}
					className={rowClassNamesSetter?.(row) || ''}
				></TableRow>
			))}
		</tbody>
	);
};

export default TableRows;