import React, { useEffect } from 'react'
import NotFound from "../app/pages/NotFound";
import PatientDetails from "../app/pages/PatientDetails";
import PatientOverview from "../app/pages/PatientOverview";
import { Navigate, Route, Routes as Router } from 'react-router-dom';
import Login from '../app/pages/Login';
import App from '../app/App';
import { useUserContext } from '../context/contextHooks/userContext ';
import { cookieAuthHandler } from '../utils/cookies';
import { dataHandler } from '../service/dataHandler';
import { TSetUser } from '../context/reducers/userReducer';

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

export const Routes = () => (
    <Router>
        <Route path='/login' element={<Login />} />
        <Route path="/" element={<ProtectedRoutes/>}>
            <Route index element={<PatientOverview />} />
            <Route path="patients" element={<PatientOverview />} />
            <Route path="patient/:id/edit" element={<PatientDetails />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    </Router>
);