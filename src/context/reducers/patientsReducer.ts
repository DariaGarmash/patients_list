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

type TActionUpdatePatient = {
    type: ACTION_TYPE.UPDATE_PATIENT;
    payload: PatientEntity;
}


export type TPatientsActions = TActionSet | TActionUpdatePatient

// Patients Reducer
export const patientsReducer = (state: TAppPatients, action: TPatientsActions): TAppPatients => {
    switch (action.type) {
        case ACTION_TYPE.SET: {
            return  produce(state, (draftstate: TAppPatients): TAppPatients => draftstate = action.payload);
        }
        case ACTION_TYPE.UPDATE_PATIENT: {
            return produce(state, draftstate => {
                if (draftstate == null) {
                    return
                }
                const index = draftstate.findIndex(p => p.id === action.payload.id)
                if (index !== -1) {
                    draftstate[index] = action.payload
                }
            });
        }
        default: {
            throw Error(`Unknown action`);
        }
    }
}