import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router';
import { useSubmitMutation } from '../Services/Blog';
import '../Css/Create.css'
import { Button, Form } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Create:React.FC<any> = () => 
{
   const [ blogtext, setBlogText ] = useState("");
   const [ title, setTitle] = useState("");
   const [ SubmitBlog, { data, error, isLoading, isSuccess, isError } ] = useSubmitMutation(); 
   const editor = React.useRef(null);

    const submitBlog = (event:any) => 
    {
        event.preventDefault();
        SubmitBlog({
            "title": title,
            "blog": blogtext,
            "token": localStorage.getItem('token')
        })
    }

    const titleChange = (data:any) =>
    {
        setTitle(data.target.value);
        console.log(data.target.value);
    }

    const change = (data:any) => 
    {
        setBlogText(data);
    }
    return (
        <div className="createcontainer">
            <div className="left-content">
            </div>
            <div className="center-content">
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label className="blog-title-text">Blog Title</Form.Label>
                    <Form.Control type="title" placeholder="Enter blog title"  onChange={titleChange}/>
                    </Form.Group>
                    <Form.Group className="mb-3 outline" controlId="formBlogEntry">

                        <Editor
                          wrapperClassName="wrapper-class"
                          toolbarClassName="toolbar-class"
                          editorClassName="editorStyle"
                          onEditorStateChange={change}
                          
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={submitBlog}>
                        Submit
                    </Button>
                </Form>
            </div>
            <div className="right-content">
            </div>
        </div>
    )
}

export default Create;