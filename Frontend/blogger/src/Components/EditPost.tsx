import React, {useState, useEffect}  from 'react'
import BlogForm from './BlogForm';
import Layout from './Layout';
import { useNavigate, useParams } from 'react-router';
import { useBlogMutation, useEditMutation } from '../Services/Blog';
//import 'react-toastify/dist/ReactToastify.css';
//import { toast } from 'react-toastify'

const EditPost:React.FC<any> = (props) =>
{
    const [ blogtext, setBlogText ] = useState() as any;
    const [ title, setTitle] = useState("");
    let params = useParams();
    const [ Blog, { data, error, isLoading, isSuccess, isError } ] = useBlogMutation(); 
    const [ SubmitEditPost, subData = {data, error, isLoading, isSuccess, isError}] = useEditMutation();
    const [richTextDescription, setRichTextDescription] = useState() as any;
    const {id} = useParams();
    const nav = useNavigate();

    useEffect(()=>
    {
        Blog(id);
    }, []);

    useEffect(() => 
    {
        if (subData.isSuccess)
        {
            if (subData.data.Success == "true") 
            {
                ///toast.success('Post successfully changed',{position: toast.POSITION.TOP_CENTER});
                nav("/myblogs/blog_edit_success")
            } else {
                //toast.error('failed updating blog entry.',{position: toast.POSITION.TOP_CENTER});
            }          
        } 
    }, [subData.isLoading])
    
    useEffect(()=> 
    {
        if (isSuccess)
        {
            if (data)
            {
                if (data.success)
                {
                    setTitle((prev) => data.success.title);
                    setRichTextDescription(JSON.parse(data.success.text));
                }
            }
        }
    },[isLoading])
    


   const submitBlog = (event:any, blogData: any) => 
    {
        SubmitEditPost(
            {
                id: data.success.id,
                authorId: data.success.authorId,     
                title: title,
                text: blogData,
                publish: data.success.publish,
                created: data.success.created,
                updated: data.success.updated,
                token: localStorage.getItem("token")
            }
        )
    }

    const titleChange = (adata:any) =>
    {
        setTitle(adata.target.value);
    }

    const change = (adata:any) => 
    {
        setRichTextDescription(adata);
    }

    const edit = () =>
    (
        <>
        {     
            subData.isSuccess ?
            (
                <>
                {
                    subData.data?
                    (
                        <>
                        {
                            subData.data.success ?
                            (
                                <></>
                            ):(
                                <>
                                    <div className="errorHandler">
                                        { subData.data.error }           
                                    </div>
                                </>
                            )
                        }
                        </>
                    ):(
                        <></>       
                    )
                }
                </>
            ) : (
                <></>
            )
        }


        <BlogForm titleChange={titleChange} submitBlog={submitBlog} title={title} change={change} contentState={ richTextDescription}  type="edit" />
        </> 
    )
    return (
        <Layout content={edit}>
        </Layout>
    )
}

export default EditPost;

function useNav() {
    throw new Error('Function not implemented.');
}
