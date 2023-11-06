import React from 'react'
import NotFound from "../app/pages/NotFound";
import PatientDetails from "../app/pages/PatientDetails";
import PatientOverview from "../app/pages/PatientOverview";
import { Route, Routes as Router } from 'react-router-dom';
import Login from '../app/pages/Login';
import App from '../app/App';

const ProtectedRoutes = () => {

    console.log('going via protected route')

    return <App />
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