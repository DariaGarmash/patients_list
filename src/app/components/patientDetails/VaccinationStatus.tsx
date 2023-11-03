import React, {FC} from "react";
import { PatientEntity } from "../../../adapters/patientsDataAdapter";
import { definePateintStatus } from "../../helpers/patientStatus";

type TPickedProperties = 'isVaccinated' | 'vaccinationDate' | 'vaccinationStatus'
type VaccinationStatusProps = Pick<PatientEntity, TPickedProperties>
  
const VaccinationStatus: FC<VaccinationStatusProps> = (
        { isVaccinated, vaccinationDate, vaccinationStatus }
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
            <div>Date: {vaccinationDate}</div>
        </article>
    );
};

export default VaccinationStatus;