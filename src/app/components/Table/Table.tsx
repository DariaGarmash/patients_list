import ErrorState from "../states/ErrorState";
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

export type TableProps<T> = {
	data?: T[] | null;
	columns: TColumn<T>[];
	isLoading?: boolean;
	error?: string;
	actions?: TAction<T>[];
}

export const Table = <T extends object>({ data, columns, isLoading, error, actions = [] }: TableProps<T>) => {
	if (!!error) {
		return <ErrorState message={error}/>
	}
	if (data == null|| isLoading) {
		return <Loader />
	}

	if (!Array.isArray(data)) {
		return <p>Wrong data format</p>
	}

	if (data.length === 0) {
		return <NoData />
	}

	return (
		<table className="table">
			<TableHeader columns={columns} />
			<TableRows data={data} columns={columns} actions={actions} />
		</table>
	);
};

export default Table;
