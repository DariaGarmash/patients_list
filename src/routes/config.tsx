import NotFound from "../app/pages/NotFound";
import PatientDetails from "../app/pages/PatientDetails";
import PatientOverview from "../app/pages/PatientOverview";
import { Outlet, Route, Routes } from 'react-router-dom';

export const routes = (
    <Routes>
        <Route path="/" element={<Outlet />}>
            <Route index element={<PatientOverview />} />
            <Route path="patients" element={<PatientOverview />} />
            <Route path="patient/:id/edit" element={<PatientDetails />} />
        </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
);