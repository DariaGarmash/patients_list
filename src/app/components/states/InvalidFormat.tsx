type InvalidFormatProps = {
    message?: string;
}
const InvalidFormat = ({ message = 'Invalid data format' }: InvalidFormatProps): JSX.Element => {
    return <section ><p>{message}</p></section>;
};

export default InvalidFormat;