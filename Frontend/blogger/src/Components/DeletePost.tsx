import React from 'react'
import { useDeleteMutation } from '../Services/Blog'

const DeletePost = () => {
    const [ deletePost, { data, error, isLoading, isSuccess, isError } ] = useDeleteMutation(); 
    
    return (
        <></>
    )
}