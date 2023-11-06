import { produce } from "immer";

export type TUser = {
    email: string,
    name: string,
    authenticated: boolean
}

export const initialUsersState: TUser = {
    email: '',
    name: '',
    authenticated: false
}
// Actions
export const enum ACTION_TYPE_USER {
    SET_USER = 'setUser',
    DELETE_USER = 'deleteUser'
}

export type TSetUser = Pick<TUser, 'email'> & {
    name: string,
    token: string
}
type TActionSet = {
    type: ACTION_TYPE_USER.SET_USER;
    payload: TSetUser;
}

type TActionAuthenticate = {
    type: ACTION_TYPE_USER.DELETE_USER;
}

export type TUserActions = TActionSet | TActionAuthenticate

// User Reducer
export const userReducer = (state: TUser, action: TUserActions) => {
    switch (action.type) {
        case ACTION_TYPE_USER.SET_USER: {
            localStorage.setItem('authenticated', 'true')
            return produce(state, draftstate => draftstate = {...action.payload, authenticated: true});
        }
        case ACTION_TYPE_USER.DELETE_USER: {
            localStorage.removeItem('authenticated')
            return produce(state, draftstate => draftstate = initialUsersState);
        }
        default: {
            throw Error(`Unknown action`);
        }
    }
}