import React, { FC } from "react";
import { PatientEntity } from "../../../adapters/patientsDataAdapter";
import { definePateintStatus } from "../../helpers/patientStatus";
import DateTimePicker from "../Datepiker";

type TPickedProperties = 'isVaccinated' | 'vaccinationDate' | 'vaccinationStatus'
export type VaccinationStatusProps = Pick<PatientEntity, TPickedProperties> & {
    onChange: (date: string) => void
}

const VaccinationStatus: FC<VaccinationStatusProps> = (
    { isVaccinated, vaccinationDate, vaccinationStatus, onChange }
): JSX.Element => {

    return (
        <ul className="property-list">
            <li className="list-item">
                <label className="label">Status:</label>
                <span className={`badge ${definePateintStatus(vaccinationStatus)}`}>
                    {isVaccinated ? 'Vaccinated' : 'Not vaccinated'}
                </span>
            </li>
            <li className="list-item">
                <DateTimePicker value={vaccinationDate}
                    label="Date:" onChange={onChange}
                    disabled={isVaccinated} />
            </li>
        </ul>
    );
};

export default VaccinationStatus;