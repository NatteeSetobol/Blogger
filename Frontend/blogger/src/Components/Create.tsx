import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import { useSubmitMutation } from '../Services/Blog';
import '../Css/Create.css'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import BlogForm from './BlogForm';
import Layout from './Layout';

const Create:React.FC<any> = () => 
{
   const [ blogtext, setBlogText ] = useState() as any;
   const [ title, setTitle] = useState("");
   const [ SubmitBlog, { data, error, isLoading, isSuccess, isError } ] = useSubmitMutation(); 
   const editor = React.useRef(null);

   const nav = useNavigate();

    useEffect(() => {
      if (isSuccess)
      {
          if (data)
          {
            if (data.Success == "true")
            {
                window.dispatchEvent(new Event("success_blog_post"));
                nav("/myblogs")
            } else {

            }
          } else {

          }
      }
    },[isLoading])

    const submitBlog = (event:any) => 
    {
        SubmitBlog({
            "title": title,
            "blog": blogtext,
            "token": localStorage.getItem('token')
        })
    }

    const titleChange = (data:any) =>
    {
        setTitle(data.target.value);
    }

    const change = (data:any) => 
    {
        setBlogText(data);
    }

    const main = () => 
    (
        <BlogForm titleChange={titleChange} submitBlog={submitBlog} change={change} contentState={blogtext} type="create"/>
    )

    return (
        <Layout content={main}>
        </Layout>
    )
}

export default Create;