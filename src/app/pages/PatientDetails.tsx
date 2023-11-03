import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { usePatientContext } from "../../context/contextHooks/usePatientsContext";
import NoData from "../components/states/NoData";
import Avatar from '../components/Avatar';
import { capitalizeFirstLetter } from '../../utils/utils';
import { diffYearsReadable } from '../../utils/dateUtils';
import Panel from "../components/Panel";
import VaccinationStatus from "../components/patientDetails/VaccinationStatus";

export const PatientDetails = () => {
	const { id } = useParams()
	const { findPatient } = usePatientContext();

	const patient = findPatient(id)

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
						<VaccinationStatus {...patient} />
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
