import React, { useEffect } from 'react'

import App from '../app/App';
import { useUserContext } from '../context/contextHooks/userContext';
import { cookieAuthHandler } from '../utils/cookies';
import { dataHandler } from '../service/dataHandler';
import { TSetUser } from '../context/reducers/userReducer';
import { Navigate } from 'react-router-dom';


const ProtectedRoutes = () => {
    const { authenticated, login } = useUserContext()

    useEffect(() => {
        const token = cookieAuthHandler.getCookieValue()
        if (!authenticated && token !== '') {
            dataHandler.post<any, TSetUser>('register', {}, {
                'Authorization': `Bearer ${token}`
            }).then(res => {
                if (res) {
                    login(res)
                }
            })
        }
    })

    return (
        authenticated ?
            <App /> :
            <Navigate to='/login' replace />
    )
}

export default ProtectedRoutes