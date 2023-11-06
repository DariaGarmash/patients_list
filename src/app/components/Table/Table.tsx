import InvalidFormat from "../states/InvalidFormat";
import Loader from "../states/Loading";
import NoData from "../states/NoData";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

export type TColumn<T> = {
	key: (keyof T) | 'actions';
	label: string;
}

export type TAction<T> = {
	label: string;
	onClick: (row: T) => void
}

export type TRowClassNamesSetter<T> = (data: T) => string;

export type TableProps<T> = {
	data?: T[] | null;
	columns: TColumn<T>[];
	isLoading?: boolean;
	actions?: TAction<T>[];
	rowClassNamesSetter?: TRowClassNamesSetter<T>
}

export const Table = <T extends object>({ data, columns, isLoading, actions = [], rowClassNamesSetter }: TableProps<T>) => {

	if (data == null|| isLoading) {
		return <Loader />
	}

	if (!Array.isArray(data)) {
		return <InvalidFormat/>
	}

	if (data.length === 0) {
		return <NoData />
	}

	return (
		<table className="table">
			<TableHeader columns={columns} />
			<TableRows data={data} columns={columns} actions={actions} rowClassNamesSetter={rowClassNamesSetter}/>
		</table>
	);
};

export default Table;
