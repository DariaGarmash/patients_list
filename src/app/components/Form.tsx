import React, { ComponentPropsWithoutRef, useState, ChangeEvent, FormEventHandler } from "react";
import Button from "./Button";

export type FormInput = ComponentPropsWithoutRef<'input'> & {
    label: string,
}

export type FormSubmit<T> = {
    buttonLabel: string,
    onSubmit: (data: T) => void
}

export type FormProps<T extends Record<string, any>> = {
    submit: FormSubmit<T>,
    inputs: FormInput[],
    initialFormData: T,
    errorMessage?: string,
}

const Form = <T extends Record<string, any>>({
    submit, inputs, initialFormData, errorMessage = ''
}: FormProps<T>): JSX.Element => {

    const [formData, setFormData] = useState<T>(initialFormData)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

        submit.onSubmit(formData)
    }

    return (
        <div className='form-holder'>
            <form onSubmit={onSubmit}>
                <div className='form-content'>
                    {inputs.map((input: FormInput) => (
                        <div className="form-control" key={input.name}>
                            <label htmlFor="email">{input.label}</label>
                            <input type={input.type} name={input.name} required={input.required} data-testid={`input-${input.name}`}
                                onChange={onChange} />
                        </div>
                    ))}
                </div>
                <Button type='submit' fullWidth>{submit.buttonLabel ?? 'Submit'}</Button>
            </form>
            {!errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Form;