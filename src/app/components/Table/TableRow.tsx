import { TableProps } from "./Table";

type TableRowProps<T> =
	Pick<TableProps<T>, 'columns' | 'actions'> & {
		row: T;
	}

const TableRow = <T,>({ row, columns, actions = [] }: TableRowProps<T>): JSX.Element => {

	const actionsNode = (
		actions.length === 0 ?
			undefined :
			<>{actions.map(act => <button onClick={() => act.onClick(row)}>{act.label}</button>)}</>
	)

	const cells = (
		<>{columns.map((column) => {
			const colKey = column.key
			const value = (row as any)[column.key]
			return <td key={`cell-${String(colKey)}`}>
				{colKey === 'actions' && actionsNode ? actionsNode : value}
			</td>
		}
		)}</>
	)

	return (
		<tr key={`row-${JSON.stringify}`}>
			{cells}
		</tr>
	);
};

export default TableRow;