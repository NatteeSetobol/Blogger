import React from 'react'
import { Route, Routes } from 'react-router'
import Index from './Components/Index'
import Login from './Components/Login'
import Create from './Components/Create'

const AppRoutes:React.FC<any> = () => {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
        </Routes>
    )
}

export default AppRoutes;