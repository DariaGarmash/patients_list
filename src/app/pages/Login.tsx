import React, { useState, FormEventHandler, ChangeEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { dataHandler } from '../../service/dataHandler'
import { TSetUser, TUser } from '../../context/reducers/userReducer'
import { useUserContext } from '../../context/contextHooks/userContext '
import { cookieAuthHandler } from '../../utils/cookies'

type TUserFormaData = TUser & Omit<TUser, 'authenticated'> & {
    password: string
}
const Login = () => {
    const { authenticated, user, login } = useUserContext()
    const [formData, setFormData] = useState<TUserFormaData>({ ...user, password: '' })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    if (authenticated) {
        return <Navigate to='/' replace/>
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        
        setError('')
        dataHandler.post<TUserFormaData, TSetUser>('login', formData)
            .then((res) => {
                const http = window.location.protocol === 'https' ? 'HttpOnly;' : '';
                cookieAuthHandler.setCookie(res.token, `Secure; ${http} SameSite=Strict;`)
                login(res)
                navigate('/')
            }).catch(error => {
                setError('Login failed, unknown email or password')
            })
    }

    

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" required onChange={onChange} />
                <input type="password" name="password" required onChange={onChange} />

                <button type='submit'>Login</button>
            </form>
            {!!error && <p>{error}</p>}
        </>

    )
}

export default Login;