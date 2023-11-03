type ErrorStateProps = {
    message?: string;
}
const ErrorState = ({message = 'Error has occured. Please try again.'}: ErrorStateProps): JSX.Element => {
    return <section className="error-state"><p>{message}</p></section>;
};

export default ErrorState;