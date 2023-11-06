import { ComponentPropsWithoutRef } from 'react'
import { TColumn, TableProps } from "./Table";
import Button from '../Button';

export type TRowClassNamesSetter<T> = (data: T) => string;

type TableRowProps<T> = ComponentPropsWithoutRef<"tr"> &
	Pick<TableProps<T>, 'columns'> & {
		row: T;
	}

const TableRow = <T,>({ row, columns, className }: TableRowProps<T>): JSX.Element => {

	const renderActions = (actions: TColumn<T>['actions'] = []) => (
		actions.length === 0 ?
			undefined :
			<>{actions.map(act => <Button key={act.type} label={act.label} onClick={() => act.onClick(row)}>{act.label}</Button>)}</>
	)

	const renderCell = (key: string, value: string, align: TColumn<T>['align'], actions: TColumn<T>['actions'] = [] ) => {
		const isCellWithActions = key === 'actions'
		const actionsNode = renderActions(actions)
		return (
			<td key={`cell-${key}`}
				className={align ? `is-aligned-${align}` : ''}>
				{isCellWithActions && actionsNode ? actionsNode : value}
		</td>
		)
	}

	const cells = (
		<>{columns.map((column) => {
			const colKey = column.key
			const value = (row as any)[column.key]
			return renderCell(String(colKey), value, column.align, column.actions)
			})
		}</>
	)

	return (
		<tr key={`row-${JSON.stringify}`} className={className}>
			{cells}
		</tr>
	);
};

export default TableRow;