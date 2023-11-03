import { dateFormat, dateTimeFormat, diffYears } from "../utils/dateUtils";
import { getRandomInt } from "../utils/utils";

export type TPatientSex = 'female' | 'male';

export type TPatient = {
    firstName: string,
    lastName: string,
    birthDate: string,
    sex: TPatientSex,
    isVaccinated: boolean,
    vaccinationDate: string,
    avatarUrl?: string
}

export class PatientEntity {
    public id: string;
    public fullName: string
    public birthDate: string;
    public age: number;
    public sex: TPatientSex;
    public isVaccinated: TPatient['isVaccinated'];
    public vaccinationDate: TPatient['vaccinationDate'];
    public avatarUrl?: string;
    public vaccinationStatus: TVaccinationStatus = "not_done"

    constructor(data: TPatient, statusDetector: VaccinationStatusDetector) {
        this.fullName = `${data.firstName} ${data.lastName}`
        this.id = `${this.fullName}_${getRandomInt(1, 1000)}`.replace(" ", '_').toLocaleLowerCase();
        this.birthDate = dateFormat(data.birthDate);
        this.age = diffYears(data.birthDate)
        this.isVaccinated = data.isVaccinated;
        this.sex = data.sex;
        this.vaccinationDate = dateTimeFormat(data.vaccinationDate);
        this.avatarUrl = data.avatarUrl

        this.vaccinationStatus = statusDetector.detectStatus({
            sex: this.sex,
            age: this.age,
            isDone: this.isVaccinated,
            date: this.vaccinationDate
        })
    }
}


type TAgeRange = { from: number, to: number }
type TSexVaciinationAgeRangeMap = {
    [key in TPatientSex]: TAgeRange
}
export type TVaccinationStatus = "done" | "ready_to_schedule" | "overdue" | "not_done"
type TDetectStatusArgs = Pick<PatientEntity, 'sex' | 'age'> & {
    date: PatientEntity['vaccinationDate'],
    isDone: PatientEntity['isVaccinated']
}

export class VaccinationStatusDetector {
    private _ageRangeMap: TSexVaciinationAgeRangeMap = {
        'female': { from: 7, to: 9 },
        'male': { from: 11, to: 13 }
    }

    private inAgeRange(sex: TPatientSex, age: number) {
        return this._ageRangeMap[sex].from <= age &&
            age < this._ageRangeMap[sex].to
    }

    private exceedAge(sex: TPatientSex, age: number) {
        return age > this._ageRangeMap[sex].to
    }

    public detectStatus(args: TDetectStatusArgs): TVaccinationStatus {
        const { sex, age, date, isDone } = args
        if (isDone) {
            return "done"
        }

        if (this.inAgeRange(sex, age) && !date) {
            return "ready_to_schedule"
        }

        if (this.exceedAge(sex, age)) {
            return "overdue"
        }

        return "not_done"
    }
}

type TPatientFilter = Pick<PatientEntity, 'age'>

export class PatientsView {
    private _patients: PatientEntity[]
    constructor(data: TPatient[]) {
        this._patients = data.map(item => new PatientEntity(item, new VaccinationStatusDetector()))
    }

    getPatients(filter?: TPatientFilter) {
        return filter == null ? this._patients : this._patients.filter(item => item.age < filter.age)
    }
}

