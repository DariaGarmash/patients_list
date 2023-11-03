import { ComponentPropsWithoutRef } from 'react'
import { TableProps } from "./Table";
import Button from '../Button';

export type TRowClassNamesSetter<T> = (data: T) => string;

type TableRowProps<T> = ComponentPropsWithoutRef<"tr"> &
	Pick<TableProps<T>, 'columns' | 'actions'> & {
		row: T;
	}

const TableRow = <T,>({ row, columns, actions = [], className }: TableRowProps<T>): JSX.Element => {

	const actionsNode = (
		actions.length === 0 ?
			undefined :
			<>{actions.map(act => <Button key={act.label} label={act.label} onClick={() => act.onClick(row)}>{act.label}</Button>)}</>
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
		<tr key={`row-${JSON.stringify}`} className={className}>
			{cells}
		</tr>
	);
};

export default TableRow;