import React, { useState } from 'react'
import { useParams } from "react-router-dom";
import { usePatientContext } from "../../context/contextHooks/usePatientsContext";
import { capitalizeFirstLetter } from '../../utils/utils';
import { diffYearsReadable } from '../../utils/dateUtils';
import Header from "../components/Header";
import NoData from "../components/states/NoData";
import Avatar from '../components/Avatar';
import Panel from "../components/Panel";
import VaccinationStatus from "../components/patientDetails/VaccinationStatus";
import { PatientEntity } from "../../adapters/patientsDataAdapter";
import "flatpickr/dist/themes/material_green.css";

export const PatientDetails = () => {
	const { id } = useParams()
	const { findPatient, updatePatient } = usePatientContext();

	const [patient, setPatient] = useState<PatientEntity | null>(findPatient(id))

	const onVaccinationDateSelect = (dateString: string) => {
		if (patient == null) {
			return
		}

		const updated = { ...patient, vaccinationDate: dateString }

		setPatient(updated)
		updatePatient(updated)
	}

	const element = (
		patient == null ?
			<p>Not found</p> :
			<>
				<section className="row">
					<Avatar url={patient.avatarUrl} />
					<article>
						<h4>{patient.fullName.toLocaleUpperCase()}</h4>
						<ul>
							<li><small>{capitalizeFirstLetter(patient.sex)}</small></li>
							<li>{diffYearsReadable(patient.age)}</li>
							<li>Born: {patient.birthDate} </li>
						</ul>
					</article>

				</section>
				<section className="row">
					<Panel title='Vaccination'>
						<VaccinationStatus {...patient} onChange={onVaccinationDateSelect}/>
					</Panel>
					
				</section>
			</>

	)

	return (
		<>
			<Header title='Patient'/>
			{!patient ? <NoData/> : element}
		</>
	);
};

export default PatientDetails;
