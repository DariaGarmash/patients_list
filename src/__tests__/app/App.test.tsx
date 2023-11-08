import React from 'react';
import { screen } from '@testing-library/react';
import App from '../../app/App';
import { renderWithContext } from '../wrappers/renderWithContext';

describe('App component', () => {
    it.skip('renders App without crashing', () => {
        const { container } = renderWithContext(<App><p>Child</p></App>);

        expect(container.getElementsByClassName('app-wrapper')[0]).toBeInTheDocument();
        expect(container.getElementsByClassName('app-header')[0]).toBeInTheDocument();

        expect(screen.getByText(/child/i)).toBeInTheDocument();
    });

    it.skip('renders App with ErrorBoundary', () => {
        const throwAnError = () => {
            throw new Error('Test error');
        };

        renderWithContext(
            <App>
                <button onClick={throwAnError}>Trigger Error</button>
            </App>
        );

        // Check if ErrorState is rendered when an error occurs
        expect(screen.getByText(/test error/i)).toBeInTheDocument();
    });

    // You can add more specific tests based on the elements or functionality within the component
});