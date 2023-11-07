import { TVaccinationStatus } from "../../adapters/patientsDataAdapter";
import { TStyleMap } from "../../types/status";
import { TStatus, defineStatus } from "./common/status";

export const definePateintStatus = (statusValue: TVaccinationStatus) => {
    const styleMap: TStyleMap<TVaccinationStatus, TStatus> = {
        'done': 'is-success',
        'ready_to_schedule': 'is-warning',
        'overdue': 'is-danger',
        'not_done': 'is-not-started'
    }
    return defineStatus<TVaccinationStatus, TStatus>(statusValue, styleMap)
};