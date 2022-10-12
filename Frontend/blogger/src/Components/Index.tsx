import React, { useEffect  } from 'react'
import Layout from './Layout';
import { useAllBlogsMutation } from '../Services/Blog';
import '../Css/Index.css'
import DraftJSParser from '../Components/DraftJSParser';

const Index:React.FC<any> = () => {
    const [ AllBlogs, { data, isLoading, isSuccess, isError } ] = useAllBlogsMutation(); 

    useEffect(()=> {
        AllBlogs(null);
    }, [])

    useEffect(()=> {
    }, [isSuccess])

    const main = () =>
    (
        <div className="Blog_Entry">
            { isError ? 
                (
                    <> Sorry, an Error has occured. </>
                ) : isSuccess ? (
                    <DraftJSParser data={data.Success} isOnePost="false">   </DraftJSParser>
                ) : isLoading ? (
                    <> loading </>
                ): null
            }
        </div>
    )
    
    return (
        <>
            <Layout content={main}>
            </Layout>
        </>
    )
}

export default Index;