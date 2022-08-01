import React from 'react'
import { Route, Routes } from 'react-router'
import Index from './Components/Index'
import Login from './Components/Login'
import Create from './Components/Create'
import Blogs from './Components/Blogs'

const AppRoutes:React.FC<any> = () => {
    return (
        <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/myblogs' element={<Blogs />} />
        </Routes>
    )
}

export default AppRoutes;