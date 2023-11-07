import { PatientEntity, TPatientSex, TVaccinationStatus, VaccinationStatusDetector } from "../../adapters/patientsDataAdapter";


const testStatusCasesFemale: Array<[Partial<PatientEntity>, TVaccinationStatus]> = [
    [{ sex: 'female', age: 6, isVaccinated: false, vaccinationDate: null }, 'not_done'],
    [{ sex: 'female', age: 8, isVaccinated: false, vaccinationDate: null }, 'ready_to_schedule'],
    [{ sex: 'female', age: 10, isVaccinated: false, vaccinationDate: null }, 'overdue'],
    [{ sex: 'female', age: 14, isVaccinated: true, vaccinationDate: '2023-01-01' }, 'done'],
];

const testStatusCasesMale: Array<[Partial<PatientEntity>, TVaccinationStatus]> = [
    [{ sex: 'male', age: 6, isVaccinated: false, vaccinationDate: null }, 'not_done'],
    [{ sex: 'male', age: 8, isVaccinated: false, vaccinationDate: null }, 'ready_to_schedule'],
    [{ sex: 'male', age: 10, isVaccinated: false, vaccinationDate: null }, 'overdue'],
    [{ sex: 'male', age: 14, isVaccinated: true, vaccinationDate: '2023-01-01' }, 'done'],
];

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

describe('VaccinationStatusDetector', () => {
    let detector: VaccinationStatusDetector;

    beforeEach(() => {
        detector = new VaccinationStatusDetector();
    });

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