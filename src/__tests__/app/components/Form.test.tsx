import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Form, { FormInput, FormProps } from '../../../app/components/Form';

type FormData = {
    email: string,
    password: string,
}

const inputValuesOnChange: FormData = {
    email: 'hello@gmal.com',
    password: 'SomeVeryComplexPassw0rD'
}

describe('Form', () => {
    const mockedInputs: FormInput[] = [
        { type: 'email', label: 'Email', name: 'email', required: true },
        { type: 'text', label: 'Password', name: 'password', required: true },
    ];

    const mockedSubmit: FormProps<FormData>['submit'] = {
        buttonLabel: 'Submit',
        onSubmit: jest.fn(),
    };

    const initialFormData: FormData = { email: '', password: '' };

    it('renders form inputs submits updated form data', async () => {
        render(
            <Form
                submit={mockedSubmit}
                inputs={mockedInputs}
                initialFormData={initialFormData}
            />
        );

        const emailInput = screen.getAllByTestId('input-email')[0] as HTMLInputElement;
        const pswInput = screen.getAllByTestId('input-password')[0] as HTMLInputElement;
        const submitButton = screen.getByText(/submit/i);

        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute('required');

        expect(pswInput).toBeInTheDocument();
        expect(pswInput).toHaveAttribute('required');

        expect(submitButton).toBeInTheDocument();

        fireEvent.change(pswInput, { target: { value: inputValuesOnChange.password } });
        fireEvent.change(emailInput, { target: { value: inputValuesOnChange.email } });

        fireEvent.click(submitButton);

        expect(mockedSubmit.onSubmit).toHaveBeenCalledWith(inputValuesOnChange);

    });
});
