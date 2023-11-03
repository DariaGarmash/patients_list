import { useParams } from "react-router-dom";
import Header from "../componenst/Header";

export const PatientDetails = () => {
	const {id} = useParams()
	
	return (
		<>
			<Header title='Patient'></Header>
			User details. Id: {id}
		</>
	);
};

export default PatientDetails;
