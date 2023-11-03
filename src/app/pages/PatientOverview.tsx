import { useState, useEffect } from 'react'
import raw_data from "../../public/data.json";
import { PatientEntityView, PatientWithVaccinationStatus, TPatient } from "../../adapters/patientsDataAdapter";
import Header from "../components/Header";
import Table, { TColumn } from '../components/Table/Table';
import { useNavigate } from 'react-router-dom';

export const PatientOverview = () => {
	const [patients, setPatients] = useState<PatientWithVaccinationStatus[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isError] = useState(false);

	const navigate = useNavigate();

	const columns: TColumn<PatientWithVaccinationStatus>[] = [
		{ key: "fullName", label: 'Full name' },
		{ key: "age", label: 'Age' },
		{ key: 'sex', label: 'Sex' },
		{ key: "vaccinationStatus", label: 'Status' },
		{ key: "vaccinationDate", label: 'Vaccination date' },
		{ key: 'actions', label: '' },
	]

	const onEdit = (row: PatientWithVaccinationStatus) => {
		navigate(`/patient/${row.id}/edit`)
	}

	const actions = [
		{ label: 'Edit', onClick: onEdit }
	]

	useEffect(() => {
		setIsLoading(true)
		setTimeout(() => {
			const dataAdapted = new PatientEntityView(raw_data as TPatient[]).getFilteredPatients({ age: 16 })
			setPatients(dataAdapted)
			setIsLoading(false)
			// setIsError(true)
		}, 400)
	}, [])

	

	return (
		<>	
			<Header title='Patients'></Header>
			<Table data={patients} columns={columns} actions={actions}
				isLoading={isLoading} isError={isError}/>
		</>
		
	);
};

export default PatientOverview;
