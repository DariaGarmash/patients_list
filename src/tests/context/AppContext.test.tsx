import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AppContext, TAppContext } from '../../context/AppContext';

// Mocking the context value

export const mockedAppContextValue: TAppContext = {
    state: {
        patients: [
            {
                id: "addison_martinez_518",
                fullName: "Addison Martinez",
                birthDate: "05 Sep 2017",
                age: 6,
                sex: "male",
                isVaccinated: true,
                vaccinationDate: "10 Mar 2021 21:43",
                vaccinationStatus: "done"
            }
        ],
        user: {
            name: 'User Name',
            email: 'some-email@gmail.com',
            authenticated: true
        }
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
            const contextUserValue = screen.getByText('User Name');
            expect(contextUserValue).toBeInTheDocument();
        })

        await waitFor(() => {
            const contexPatientsValue = screen.getByText('Addison Martinez');
            expect(contexPatientsValue).toBeInTheDocument();
        })
    });
});