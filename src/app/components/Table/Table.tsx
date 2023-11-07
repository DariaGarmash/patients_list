import React from 'react'
import InvalidFormat from "../states/InvalidFormat";
import Loader from "../states/Loading";
import NoData from "../states/NoData";
import TableHeader from "./TableHeader";
import TableRows from "./TableRows";

export type TColumnAlignment = 'right'| 'center' | 'left'
export type TColumn<T> = {
	key: (keyof T) | 'actions';
	label: string;
	actions?: TAction<T>[];
	align?: TColumnAlignment;
}

export type TAction<T> = {
	type: string;
	label: string;
	onClick: (row: T) => void
}

export type TRowClassNamesSetter<T> = (data: T) => string;

export type TableProps<T> = {
	data?: T[] | null;
	columns: TColumn<T>[];
	isLoading?: boolean;
	rowClassNamesSetter?: TRowClassNamesSetter<T>
}

export const Table = <T extends object>({ data, columns, isLoading, rowClassNamesSetter }: TableProps<T>) => {

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
			<TableRows data={data} columns={columns} rowClassNamesSetter={rowClassNamesSetter}/>
		</table>
	);
};

export default Table;
