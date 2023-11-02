import { Link } from "react-router-dom";
import data from "../../public/data.json";
import { PatientEntity, PatientEntityView } from "../../adapters/patientsDataAdapter";
import { TPatient } from "../../types/patients";

const Table = () => {

    const dataAdapted = new PatientEntityView(data as TPatient[]).getFilteredPatients({age: 16})
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
                {dataAdapted.map((p: PatientEntity, index) => (
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