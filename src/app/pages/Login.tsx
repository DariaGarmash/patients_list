import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { dataHandler } from '../../service/dataHandler'
import { TSetUser, TUser } from '../../context/reducers/userReducer'
import { useUserContext } from '../../context/contextHooks/userContext '
import Form, { FormInput, FormSubmit } from '../components/Form'

type TUserFormaData = TUser & Omit<TUser, 'authenticated'> & {
    password: string
}
const Login = () => {
    const { authenticated, user, login } = useUserContext()

    const [error, setError] = useState('')
    const navigate = useNavigate()

    if (authenticated) {
        return <Navigate to='/' replace/>
    }

    const onSubmit = (updatedFormData: TUserFormaData) => {
        setError('')
        dataHandler.post<TUserFormaData, TSetUser>('login', updatedFormData)
            .then((res) => {
                login(res)
                navigate('/')
            }).catch(error => {
                setError('Login failed, unknown email or password')
            })
    }

    const formInitialData = { ...user, password: '' }

    const formInputs: FormInput[] = [
        { label: 'E-mail', name: 'email', type: 'email', required: true },
        { label: 'Password', name: 'password', type: 'password', required: true }
    ]

    const formSubmit: FormSubmit<TUserFormaData> = {
        buttonLabel: 'Login',
        onSubmit
    }

    return (
        authenticated ?
            <></> :
            <section className='login-page'>
                <Form inputs={formInputs}
                    submit={formSubmit}
                    initialFormData={formInitialData}
                    errorMessage={error}
                />
            </section>
    )
}

export default Login;