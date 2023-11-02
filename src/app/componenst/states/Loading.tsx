type LoaderStateProps = {
    message?: string;
}
const Loader= ({message = 'Loading ...'}: LoaderStateProps): JSX.Element => {
    return <section className="loading-state"><p>{message}</p></section>;
};

export default Loader;