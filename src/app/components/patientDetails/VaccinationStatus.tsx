import React, {FC} from "react";
import { PatientEntity } from "../../../adapters/patientsDataAdapter";
import { definePateintStatus } from "../../helpers/patientStatus";
import { formatISO } from "date-fns";
import { dateTimeFormat } from "../../../utils/dateUtils";
import Flatpickr from "react-flatpickr";

type TPickedProperties = 'isVaccinated' | 'vaccinationDate' | 'vaccinationStatus'
type VaccinationStatusProps = Pick<PatientEntity, TPickedProperties> & {
    onChange: (date: string) => void
}
  
const VaccinationStatus: FC<VaccinationStatusProps> = (
    { isVaccinated, vaccinationDate, vaccinationStatus, onChange }
    ): JSX.Element => {

    const dateIsoString = vaccinationDate ? formatISO(new Date(vaccinationDate)) : undefined

    const onVaccinationDateSelect = (date: Date[]) => {
        onChange(dateTimeFormat(date[0]))
    }

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
                <Flatpickr
                    defaultValue={dateIsoString}
                    data-enable-time
                    onChange={onVaccinationDateSelect}
                    disabled={isVaccinated}
                    options={{
                        enableTime: true,
                        altInput: true,
                        altFormat: 'd M Y H:i',
                        time_24hr: true,
                    }}
                /></div>
        </article>
    );
};

export default VaccinationStatus;