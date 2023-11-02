export type TPatient  = {
    firstName: string,
    lastName: string,
    birthDate: string,
    sex: string,
    isVaccinated: boolean,
    vaccinationDate?: string | null,
    avatarUrl?: string
}