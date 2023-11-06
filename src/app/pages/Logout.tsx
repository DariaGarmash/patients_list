import React, { MouseEvent } from 'react'
import Button from '../components/Button'
import { useUserContext } from '../../context/contextHooks/userContext '
import { dataHandler } from '../../service/dataHandler'
import { cookieAuthHandler } from '../../utils/cookies'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const {user, logout} = useUserContext()
    const navigate = useNavigate()
   
    const onLogout = (e?: MouseEvent) => {
        e?.preventDefault()

        dataHandler.post('logout', {})
            .then((res) => {
                cookieAuthHandler.removeCookie()
                logout()
                navigate('/')
            }).catch(error => {
                throw Error('Logout failed')
            })
    }

    return (
        <div className='logout-wrapper'>
            <span>{user.name.toUpperCase()}</span>
            <Button onClick={onLogout}>Logout</Button>
        </div>
        
    )
}

export default Logout;