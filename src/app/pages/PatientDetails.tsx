import { useState } from 'react'
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { usePatientContext } from "../../context/contextHooks/usePatientsContext";
import NoData from "../components/states/NoData";
import { TAppPatient } from '../../context/reducers/patientsReducer';

export const PatientDetails = () => {
	const {id} = useParams()
	const { findPatient } = usePatientContext();

	const [ patient ] = useState<TAppPatient>(findPatient(id))

	return (
		<>
			<Header title='Patient'></Header>
			{!patient ? 
				<NoData/> : 
				<>
					{JSON.stringify(patient)}
				</>}
		</>
	);
};

export default PatientDetails;
