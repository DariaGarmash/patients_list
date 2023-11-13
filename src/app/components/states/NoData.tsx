import React from 'react'
type NoDataProps = {
    message?: string;
}
const NoData = ({ message = 'No data found.' }: NoDataProps): JSX.Element => {
    return <section className="no-data-state"><p>{message}</p></section>;
};

export default NoData;