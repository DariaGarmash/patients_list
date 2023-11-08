import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AppContext, TAppContext } from '../../context/AppContext';
import { mockedPatientName, mockedPatientsValue, mockedUserValue } from '../mocked/contextValue';

export const mockedAppContextValue: TAppContext = {
    state: {
        patients: mockedPatientsValue,
        user: mockedUserValue
    },
    dispatchPatients: jest.fn(),
    dispatchUser: jest.fn()
}

describe('AppContextProvider', () => {
    it('provides the correct initial context value', async () => {
        render(
            <AppContext.Provider value={mockedAppContextValue}>
                <AppContext.Consumer>
                    {value => (
                        <div>
                            <p>{value.state.user.name}</p>
                            <p>{value.state.patients?.[0].fullName}</p>
                        </div>   
                    )}
                </AppContext.Consumer>
            </AppContext.Provider>
        );

        await waitFor(() => {
            const contextUserValue = screen.getByText(mockedUserValue.name);
            expect(contextUserValue).toBeInTheDocument();
        })

        await waitFor(() => {
            const contexPatientsValue = screen.getByText(mockedPatientName);
            expect(contexPatientsValue).toBeInTheDocument();
        })
    });
});