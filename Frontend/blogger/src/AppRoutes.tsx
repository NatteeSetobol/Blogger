import React from 'react'
import { Route, Routes } from 'react-router'
import Index from './Components/Index'
import Login from './Components/Login'
import Create from './Components/Create'
import Blogs from './Components/Blogs'
import EditPost from './Components/EditPost'

const AppRoutes:React.FC<any> = () => {
    return (
        <Routes>
            <Route path='/' element={<Index />} >
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/create' element={<Create />} />
            <Route path='/myblogs' element={<Blogs />} >
                <Route path=':msg' element={<Blogs />} />
            </Route>
            <Route path='/edit/' element={<EditPost />} >
                <Route path=':id' element={<EditPost />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes;