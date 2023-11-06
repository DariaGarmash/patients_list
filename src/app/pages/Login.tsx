import React, { useState, FormEventHandler, ChangeEvent } from 'react'

type TUserFormaData = {
    email: string,
    password: string
}

const Login = () => {
    const [formData, setFormData] = useState<TUserFormaData>({ email: '', password: '' })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        console.log('on login', formData)
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" required onChange={onChange} />
                <input type="password" name="password" required onChange={onChange} />

                <button type='submit'>Login</button>
            </form>
        </>

    )
}

export default Login;