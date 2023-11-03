import { produce } from "immer";
import { PatientEntity } from "../../adapters/patientsDataAdapter";

export type TAppPatients = PatientEntity[] | null
export type TAppPatient = PatientEntity | null

export const initialPatientsState: TAppPatients = null
// Actions
export const enum ACTION_TYPE {
    SET = 'set',
    UPDATE_PATIENT = 'updatePatient'
}
type TActionSet = {
    type: ACTION_TYPE.SET;
    payload: TAppPatients;
}


export type TPatientsActions = TActionSet

// Patients Reducer
export const patientsReducer = (state: TAppPatients, action: TPatientsActions): TAppPatients => {
    switch (action.type) {
        case ACTION_TYPE.SET: {
            return  produce(state, (draftstate: TAppPatients): TAppPatients => draftstate = action.payload);
        }
        default: {
            throw Error(`Unknown action`);
        }
    }
}