import React, { useEffect  } from 'react'
import { useVerifyMutation } from '../Services/Login';
import { useNavigate } from 'react-router';

const Index:React.FC<any> = () => {
   const [Verify, { data, error, isLoading, isSuccess, isError}] = useVerifyMutation(); 
   const nav = useNavigate();

    useEffect(()=> {
        Verify({'token': localStorage.getItem('token')});
    },[])

    /*
    useEffect(() => {
        if (data.verify)
        {
            if (data.verify == "true")
            {
                nav('/blog')
            }
        }
    },[data.isLoading])
    */
    return (
        <>
            nothing to see here!
        </>
    )
}

export default Index;