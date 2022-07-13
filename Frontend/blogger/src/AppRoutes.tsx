import React from 'react'
import { Route, Routes } from 'react-router'
import Index from './Components/Index'
import Login from './Components/Login'

const AppRoutes:React.FC<any> = () => {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    )
}

export default AppRoutes;