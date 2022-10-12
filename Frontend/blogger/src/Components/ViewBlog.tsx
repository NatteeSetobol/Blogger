import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router';
import { useBlogMutation } from '../Services/Blog';
import Layout from './Layout';
import '../Css/Index.css'
import DraftJSParser from '../Components/DraftJSParser';

const ViewBlog:React.FC<any> = ( mycontent:any) => 
{
    const [ Blog, { data, error, isLoading, isSuccess, isError } ] = useBlogMutation(); 
    const {id} = useParams();
    const [ dataArray,setDataArray ] = useState([] as any) 


    useEffect(()=>
    {
        Blog(id);
    }, []);




    const main = () => 
    (
        <>
        <div className="Blog_Entry">
            { isError ? 
                (
                    <> Sorry, an Error has occured. </>
                ) : isSuccess ? (
                    <>
                    <DraftJSParser data={ data.success } isOnePost="true" /> 
                    </>
                ) : isLoading ? (
                    <> loading </>
                ): null
            }
        </div>

        </>
    )

    

    return (
        <>
            <Layout content={main}>
               
            </Layout>
        </>
    )
}

export default ViewBlog;
