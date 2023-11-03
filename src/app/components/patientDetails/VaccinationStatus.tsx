import React, {FC} from "react";
import { PatientEntity } from "../../../adapters/patientsDataAdapter";
import { definePateintStatus } from "../../helpers/patientStatus";
import DateTimePicker from "../Datepiker";

type TPickedProperties = 'isVaccinated' | 'vaccinationDate' | 'vaccinationStatus'
type VaccinationStatusProps = Pick<PatientEntity, TPickedProperties> & {
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
                        {vaccinationStatus}
                </span>
                <small> ({isVaccinated ? 'vaccinated' : 'not vaccinated'})</small>
            </div>
            <div className="datepicker-form-control">
                <span className="label">Date:</span>
                <DateTimePicker value={vaccinationDate}
                    label="Date:" onChange={onChange}
                    disabled={isVaccinated} />
            </div>
        </article>
    );
};

export default VaccinationStatus;