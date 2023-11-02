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