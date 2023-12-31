import React from 'react'
import { FallbackProps } from 'react-error-boundary'

const ErrorState = ({ error }: FallbackProps): JSX.Element => {
    return (
        <section role="alert" className='error-state'>
            <p>Something went wrong</p>
            <pre>{error.message}</pre>
        </section>
    );
};

export default ErrorState;