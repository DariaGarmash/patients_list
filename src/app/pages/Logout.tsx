import React, { MouseEvent } from 'react'
import Button from '../components/Button'
import { useUserContext } from '../../context/contextHooks/userContext '
import { dataHandler } from '../../service/dataHandler'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { FaPowerOff } from "react-icons/fa";

const Logout = () => {
    const {user, logout} = useUserContext()
    const navigate = useNavigate()
   
    const onLogout = (e?: MouseEvent) => {
        e?.preventDefault()

        dataHandler.post('logout', {})
            .then((res) => {
                logout()
                navigate('/')
            }).catch(error => {
                throw Error('Logout failed')
            })
    }

    return (
        <div className='logout-wrapper'>
            <Avatar small />
            <span>{user.name.toUpperCase()}</span>
            <Button onClick={onLogout}><FaPowerOff /></Button>
        </div>
        
    )
}

export default Logout;