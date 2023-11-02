import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import raw_data from "../../public/data.json";
import { PatientEntityView, PatientWithVaccinationStatus } from "../../adapters/patientsDataAdapter";
import { TPatient } from "../../types/patients";
import ErrorState from "./states/ErrorState";
import Loader from "./states/Loading";
import NoData from "./states/NoData";

const Table = () => {

    const [data, setData] = useState<PatientWithVaccinationStatus[] | null>(null)
    const [isLoading, setLoading] = useState(false)
    const [isError] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            const dataAdapted = new PatientEntityView(raw_data as TPatient[]).getFilteredPatients({age: 16})
            setData(dataAdapted)
            setLoading(false)
            // setIsError(true)
        }, 400)
    }, [])

    if(isError){
        return <ErrorState/>
    }

    if(isLoading){
        return <Loader />
    }

    if(data === null || data.length === 0){
        return <NoData />
    }
    

    return (
        <table  className="table">
            <thead>
                <tr>
                    <th>firstName</th>
                    <th>lastName</th>
                    <th>birthDate</th>
                    <th>sex</th>
                    <th>isVaccinated</th>
                    <th>vaccinationDate</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((p: PatientWithVaccinationStatus) => (
                    <tr key={p.id}>
                        <td>{p.fullName}</td>
                        <td>{p.age}</td>
                        <td>{p.birthDate}</td>
                        <td>{p.sex}</td>
                        <td>{String(p.isVaccinated)}</td>
                        <td>{!!p.vaccinationDate ? p.vaccinationDate: ''}</td>
                        <td><Link to='patient/edit'>Edit</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
  );
};

export default Table