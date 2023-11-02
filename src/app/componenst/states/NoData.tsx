type NoDataProps = {
    message?: string;
}
const NoData= ({message = 'No data found.'}: NoDataProps): JSX.Element => {
    return <section className="loading-state"><p>{message}</p></section>;
};

export default NoData;