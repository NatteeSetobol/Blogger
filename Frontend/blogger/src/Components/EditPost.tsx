import React, {useState, useEffect}  from 'react'
import BlogForm from './BlogForm';
import Layout from './Layout';
import { useParams } from 'react-router';
import { useBlogMutation, useEditMutation } from '../Services/Blog';

const EditPost:React.FC<any> = (props) =>
{
    const [ blogtext, setBlogText ] = useState() as any;
    const [ title, setTitle] = useState("");
    let params = useParams();
    const [ Blog, { data, error, isLoading, isSuccess, isError } ] = useBlogMutation(); 
    const [ SubmitEditPost, SubData = {data, error, isLoading, isSuccess, isError}] = useEditMutation();
    const [richTextDescription, setRichTextDescription] = useState() as any;
    const {id} = useParams();

    useEffect(()=>
    {
        Blog(id);
    }, []);
    
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
    
    const edit = () =>
    (
        <BlogForm titleChange={titleChange} submitBlog={submitBlog} title={title} change={change} contentState={ richTextDescription}  type="edit" />
    )

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

    return (
        <Layout content={edit}>
        </Layout>
    )
}

export default EditPost;