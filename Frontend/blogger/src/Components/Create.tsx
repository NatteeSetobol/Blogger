import React, { useEffect, useState, useMemo} from 'react'
import { useNavigate } from 'react-router';
import { useSubmitMutation } from '../Services/Blog';
import '../Css/Create.css'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import BlogForm from './BlogForm';
import Layout from './Layout';
//import 'react-toastify/dist/ReactToastify.css';
//import { toast,ToastContainer } from 'react-toastify';

const Create:React.FC<any> = () => 
{
   const [ hasRan, setHasRan ] = useState(false);
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
                //toast.success('successfully created!',{position: toast.POSITION.TOP_CENTER});
                if (hasRan == false)
                {
                    
                    let timeout = setTimeout(() => {
                        window.dispatchEvent(new Event("success_blog_post"));
                        clearTimeout(timeout);
                    }, 500);
                    
                    nav("/myblogs")
                    console.log("ran windows dispatch");
                    setHasRan(true);
                }
            } else {

            }
          } else {

          }
      }
    },[isLoading])

    const submitBlog = (event:any) => 
    {
        if (title.length == 0)
        {
           // toast.error('Error, Please enter a title!',{position: toast.POSITION.TOP_CENTER});
            //window.dispatchEvent(new Event("success_blog_post"));
        } else {
            SubmitBlog({
                "title": title,
                "blog": blogtext,
                "token": localStorage.getItem('token')
            })
        }
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
        <>
        <Layout content={main}>
        </Layout>
        </>
    )
}

export default Create;