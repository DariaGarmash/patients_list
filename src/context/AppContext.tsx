import React, { FC, useReducer, ReactNode, createContext, Dispatch, useMemo } from 'react'
import { TAppPatients, TPatientsActions, initialPatientsState, patientsReducer } from './reducers/patientsReducer'
import { TUser, TUserActions, initialUsersState, userReducer } from './reducers/userReducer'

export type TAppStateType = {
    patients: TAppPatients,
    user: TUser
}

export const initialState: TAppStateType = {
    patients: initialPatientsState,
    user: initialUsersState
}

export type TAppContext = {
    state: TAppStateType
    dispatchPatients: Dispatch<TPatientsActions>
    dispatchUser: Dispatch<TUserActions>
}

const AppContext = createContext<TAppContext>({
    state: initialState,
    dispatchPatients: () => { },
    dispatchUser: () => { }
})

type AppContextProviderProps = {
    children: ReactNode
}

const AppContextProvider: FC<AppContextProviderProps> = ({ children }: AppContextProviderProps) => {

    const [patients, dispatchPatients] = useReducer(patientsReducer, initialPatientsState);
    const [user, dispatchUser] = useReducer(userReducer, initialUsersState)

    const value = useMemo(() => ({
        state: { patients, user },
        dispatchPatients,
        dispatchUser
    }), [patients, user])

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export { AppContext, AppContextProvider }
