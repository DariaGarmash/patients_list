import { PatientEntity, TPatient, TPatientSex, TVaccinationStatus, VaccinationStatusDetector } from "../../adapters/patientsDataAdapter";

const verifyTestCases = (detector: VaccinationStatusDetector, testCases: Array<[Partial<PatientEntity>, TVaccinationStatus]>) => {
    testCases.forEach(([patientData, expectedStatus]) => {
        const status = detector.detectStatus({
            sex: patientData.sex as TPatientSex,
            age: patientData.age || 0,
            isDone: patientData.isVaccinated || false,
            date: patientData.vaccinationDate || null,
        });
        expect(status).toBe(expectedStatus);
    });
}

let detector = new VaccinationStatusDetector();

describe('VaccinationStatusDetector', () => {

    it('should correctly detect vaccination status for female', () => {
        const testCasesFemale: Array<[Partial<PatientEntity>, TVaccinationStatus]> = [
            [{ sex: 'female', age: 6, isVaccinated: false, vaccinationDate: null }, 'not_done'],
            [{ sex: 'female', age: 8, isVaccinated: false, vaccinationDate: null }, 'ready_to_schedule'],
            [{ sex: 'female', age: 10, isVaccinated: false, vaccinationDate: null }, 'overdue'],
            [{ sex: 'female', age: 14, isVaccinated: true, vaccinationDate: '2023-01-01' }, 'done'],
        ];

        verifyTestCases(detector, testCasesFemale)
    });

    it('should correctly detect vaccination status for male', () => {
        const testCasesMale: Array<[Partial<PatientEntity>, TVaccinationStatus]> = [
            [{ sex: 'male', age: 6, isVaccinated: false, vaccinationDate: null }, 'not_done'],
            [{ sex: 'male', age: 12, isVaccinated: false, vaccinationDate: null }, 'ready_to_schedule'],
            [{ sex: 'male', age: 15, isVaccinated: false, vaccinationDate: null }, 'overdue'],
            [{ sex: 'male', age: 14, isVaccinated: true, vaccinationDate: '2023-01-01' }, 'done'],
        ];

        verifyTestCases(detector, testCasesMale)
    });
});


describe('PatientView', () => {
    it('should adapt a patient data with correct properties and status', () => {
        const patientData: TPatient = {
            firstName: 'Dakota',
            lastName: 'Smith',
            birthDate: "2014-07-29T17:55:05.848Z",
            sex: 'male',
            isVaccinated: true,
            vaccinationDate: "2021-07-07T15:55:08.010Z"
        };

        const patient = new PatientEntity(patientData, detector);

        expect(patient.fullName).toBe('Dakota Smith');
        expect(patient.birthDate).toBe('29 Jul 2014');
        expect(patient.age).toBe(9);
        expect(patient.vaccinationStatus).toBe('done');
    });
});