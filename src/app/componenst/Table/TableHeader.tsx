import { TableProps } from "./Table";

type TableHeaderProps<T> = {
	columns: TableProps<T>['columns'];
  }
  
  const TableHeader = <T,>({ columns }: TableHeaderProps<T>): JSX.Element => {
	const headers = columns.map((column, index) => (
		<th key={`header-${index}`}>
			{column.label}
		</th>
	  ));
  
	return (
	  <thead>
		<tr>{headers}</tr>
	  </thead>
	);
  };
  
  export default TableHeader;