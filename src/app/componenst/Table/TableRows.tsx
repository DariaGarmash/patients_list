import { TableProps } from "./Table";
import TableRow from "./TableRow";

export type TRowClassNamesSetter<T> = (data: T) => string;

const TableRows = <T,>({ data, columns, actions }: TableProps<T>): JSX.Element => {

	return (
		<tbody>
			{Array.isArray(data) && data.map((row) => (
				<TableRow key={JSON.stringify(row)}
					row={row} columns={columns}
					actions={actions}
				></TableRow>
			))}
		</tbody>
	);
};

export default TableRows;