import { Link } from "react-router-dom";
import data from "../../public/data.json";
import { TPatient } from "../../types/patients";

const Table = () => {
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
          {data.map((p: TPatient, index) => (
            <tr key={index}>
                <td>{p.firstName}</td>
                <td>{p.lastName}</td>
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