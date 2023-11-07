import { TPatient } from "../../../adapters/patientsDataAdapter";

export const mockedPatients: TPatient[] = [
    {
        firstName: "Addison",
        lastName: "Martinez",
        birthDate: "2008-09-05T20:51:25.182Z",
        sex: "male",
        isVaccinated: true,
        vaccinationDate: "2021-03-10T20:43:01.337Z"
    },
    {
        firstName: "Emery",
        lastName: "Smith",
        birthDate: "2016-07-09T09:19:43.849Z",
        sex: "female",
        isVaccinated: false,
        vaccinationDate: null
    },
    {
        firstName: "Addison",
        lastName: "Jones",
        birthDate: "2010-04-01T07:50:03.327Z",
        sex: "female",
        isVaccinated: true,
        vaccinationDate: "2021-04-09T10:00:55.837Z"
    },
    {
        firstName: "Dakota",
        lastName: "Smith",
        birthDate: "2001-07-29T17:55:05.848Z",
        sex: "male",
        isVaccinated: true,
        vaccinationDate: "2021-07-07T15:55:08.010Z"
    },
]