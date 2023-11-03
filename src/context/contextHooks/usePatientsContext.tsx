
import {useContext} from 'react'
import { AppContext } from '../AppContext'
import { ACTION_TYPE, TAppPatients } from '../reducers/patientsReducer'
import { PatientEntity } from '../../adapters/patientsDataAdapter'

export const usePatientContext = () => {
    const {state: {patients}, dispatch} = useContext(AppContext)

    const setPatients = (patients: TAppPatients) => dispatch({type: ACTION_TYPE.SET, payload: patients})
    const findPatient = (id?: PatientEntity['id']) => patients !== null && !!id ? patients.find(p => p.id === id) ?? null : null

    return {
        patients,
        setPatients,
        findPatient
    }
}