import { dateFormat, dateTimeFormat, diffYears } from "../utils/dateUtils";
import { getRandomInt } from "../utils/utils";

export type TPatientSex = 'female' | 'male';

export type TPatient  = {
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

    constructor(data: TPatient){
        this.fullName = `${data.firstName} ${data.lastName}`
        this.id = `${this.fullName}_${getRandomInt(1, 1000)}`.replace(" ", '_').toLocaleLowerCase();
        this.birthDate = dateFormat(data.birthDate);
        this.age = diffYears(data.birthDate)
        this.isVaccinated = data.isVaccinated;
        this.sex = data.sex;
        this.vaccinationDate = dateTimeFormat(data.vaccinationDate);
        this.avatarUrl = data.avatarUrl
    }
}


type TAgeRange = {from: number, to: number}
type TSexVaciinationAgeRangeMap = {
    [key in TPatientSex]: TAgeRange
}
export type TVaccinationStatus = "done" | "ready_to_schedule" | "overdue" | "not_done"

export class PatientWithVaccinationStatus extends PatientEntity {
    public vaccinationStatus: TVaccinationStatus =  "not_done"
    private _ageRangeMap: TSexVaciinationAgeRangeMap = {
        'female': {from: 7, to: 9},
        'male': {from: 11, to: 13}
    }

    constructor(data: TPatient){
        super(data)
        this.updateVaccinationStatus(this.sex, this.age)
    }

    private inAgeRange(sex: TPatientSex, age: number){
        return this._ageRangeMap[sex].from <= age && 
                age < this._ageRangeMap[sex].to
    }

    private exceedAge(sex: TPatientSex, age: number){
        return age > this._ageRangeMap[sex].to
    }

    private defineStatus(sex: TPatientSex, age: number): TVaccinationStatus {
        if(this.isVaccinated){
            return "done"
        }

        if(this.inAgeRange(sex, age) && !this.vaccinationDate){
            return "ready_to_schedule"
        }

        if(this.exceedAge(sex, age)){
            return "overdue"
        }

        return "not_done"
    }

    private updateVaccinationStatus(sex: TPatientSex, age: number){
        this.vaccinationStatus = this.defineStatus(sex, age)
    }
}

type TPatientFilter = {
    age: number
}

export class PatientView {
    private _patient: PatientWithVaccinationStatus
    constructor(data: TPatient){
        this._patient = new PatientWithVaccinationStatus(data)
    }
    get patient(){
        return this._patient
    } 
}

export class PatientEntityView {
    private _patients: PatientWithVaccinationStatus[]
    constructor(data: TPatient[]){
        this._patients = data.map(item => new PatientView(item).patient)
    }

    getFilteredPatients(filter: TPatientFilter) {
        return this._patients.filter(item => item.age < filter.age)
    }
}