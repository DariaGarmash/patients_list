import React, {FC} from "react";
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
        <article className="property-list">
            <div>
                <span className="label">Status:</span>
                <span className={`badge ${definePateintStatus(vaccinationStatus)}`}>
                    { isVaccinated? 'Vaccinated': 'Not vaccinated' }
                </span>
            </div>
            <div className="datepicker-form-control">
                <DateTimePicker value={vaccinationDate}
                    label="Date:" onChange={onChange}
                    disabled={isVaccinated}/>
            </div>
        </article>
    );
};

export default VaccinationStatus;