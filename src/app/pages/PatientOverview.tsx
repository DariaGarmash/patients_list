import { useState, useEffect } from 'react'
import {PatientEntity, PatientsView, TPatient } from "../../adapters/patientsDataAdapter";
import Header from "../components/Header";
import Table, { TColumn } from '../components/Table/Table';
import { useNavigate } from 'react-router-dom';
import { dataHandler } from '../../service/dataHandler';
import { definePateintStatus } from '../helpers/patientStatus';
import { usePatientContext } from '../../context/contextHooks/usePatientsContext';

export const PatientOverview = () => {
	const { patients, setPatients } = usePatientContext();

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const navigate = useNavigate();

	const columns: TColumn<PatientEntity>[] = [
		{ key: "fullName", label: 'Full name' },
		{ key: "age", label: 'Age' },
		{ key: 'sex', label: 'Sex' },
		{ key: "vaccinationStatus", label: 'Status' },
		{ key: "vaccinationDate", label: 'Vaccination date' },
		{ key: 'actions', label: '' },
	]

	const onEdit = (row: PatientEntity) => {
		navigate(`/patient/${row.id}/edit`)
	}

	const actions = [
		{ label: 'Edit', onClick: onEdit }
	]

	useEffect(() => {
		if (patients == null) {
			dataHandler.get<TPatient[]>('patients')
				.then(data => {
					const filteredData = new PatientsView(data).getPatients({ age: 16 })
					setPatients(filteredData)
				}
				)
				.catch(e => {
					setError(e.message)
				}).finally(
					() => setIsLoading(false)
				)
		}
	})

	
	const defineRowStyling = (row: PatientEntity) => {
		return definePateintStatus(row.vaccinationStatus)
	}

	return (
		<>	
			<Header title='Patients'/>
			<Table data={patients} columns={columns} actions={actions}
				isLoading={isLoading} error={error} 
				rowClassNamesSetter={defineRowStyling}/>
		</>
		
	);
};

export default PatientOverview;
