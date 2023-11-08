import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Logout from '../../../app/pages/Logout';
import { useUserContext } from '../../../context/contextHooks/userContext';
import { dataHandler } from '../../../service/dataHandler';
import { renderWithContext } from '../../wrappers/renderWithContext';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../../../service/dataHandler', () => ({
    post: jest.fn(),
}));

describe('Logout Component', () => {

    it.skip('logs out user on button click', async () => {
        const mockUserContextReturnValue = { user: { name: 'John' }, logout: jest.fn(), authenticated: true };
        (useUserContext as jest.Mock).mockImplementation(() => mockUserContextReturnValue);

        const jestInstance: jest.Mock<Promise<any>> = dataHandler.post as jest.Mock<Promise<any>>;
        renderWithContext(<Logout />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        jestInstance.mockResolvedValueOnce({ status: 'ok' });
        await dataHandler.post('logout', {});

        expect(mockUserContextReturnValue.logout).toHaveBeenCalled();

        const navigate = useNavigate();
        expect(navigate).toHaveBeenCalledWith('/');
    });

    it.skip('handles logout failure', async () => {
        const mockUserContextReturnValue = { user: { name: 'John' }, logout: jest.fn(), authenticated: true };
        (useUserContext as jest.Mock).mockImplementation(() => mockUserContextReturnValue);

        const jestInstance: jest.Mock<Promise<any>> = dataHandler.post as jest.Mock<Promise<any>>;

        renderWithContext(<Logout />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        jestInstance.mockRejectedValueOnce(new Error("Error on logout"));
        await expect(dataHandler.post('logout', {})).rejects.toThrow('Logout failed');
    });
});

