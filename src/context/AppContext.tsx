import {FC, useReducer, ReactNode, createContext, Dispatch} from 'react'
import { TAppPatients, TPatientsActions, initialPatientsState, patientsReducer } from './reducers/patientsReducer'

export type TAppStateType = {
    patients: TAppPatients
}

export const initialState: TAppStateType = {
    patients: initialPatientsState,
}

type TStateActions = TPatientsActions

export type TAppContext = {
    state: TAppStateType
    dispatch: Dispatch<TStateActions>
}

const AppContext = createContext<TAppContext>({
    state: initialState,
    dispatch: () => {}
})

type AppContextProviderProps = {
    children: ReactNode
}

const rootReducer = ({ patients }: TAppStateType, action: TStateActions) => ({
    patients: patientsReducer(patients, action),
});

const AppContextProvider: FC<AppContextProviderProps> = ({ children }: AppContextProviderProps) => {
    const [state, dispatch] = useReducer(
        rootReducer,
        initialState
    )

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }
