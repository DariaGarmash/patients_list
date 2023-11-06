
import { useContext } from 'react'
import { AppContext } from '../AppContext'
import { ACTION_TYPE_USER, TSetUser } from '../reducers/userReducer'

export const useUserContext = () => {
    const {state: {user}, dispatchUser} = useContext(AppContext)
    const authenticated = !!localStorage.getItem('authenticated')

    const login = (user: TSetUser) => dispatchUser({ type: ACTION_TYPE_USER.SET_USER, payload: user})
    const logout = () => dispatchUser({ type: ACTION_TYPE_USER.DELETE_USER})

    return {
        login,
        logout,
        user,
        authenticated
    }
}