import { TAppPatient, TAppPatients } from "../../context/reducers/patientsReducer"
import { TUser } from "../../context/reducers/userReducer"

// Mocking the context value
export const mockedPatientName = "Addison Martinez"
export const mockedPatient: TAppPatient = {
    id: "addison_martinez_518",
    fullName: mockedPatientName,
    birthDate: "05 Sep 2017",
    age: 6,
    sex: "male",
    isVaccinated: true,
    vaccinationDate: "10 Mar 2021 21:43",
    vaccinationStatus: "done"
}

export const mockedPatientsValue: TAppPatients = [
    mockedPatient
]

export const mockedUserValue: TUser = {
    name: 'User Name',
    email: 'some-email@gmail.com',
    authenticated: true
}
