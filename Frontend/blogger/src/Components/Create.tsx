import React, { useEffect} from 'react'
import { useNavigate } from 'react-router';
import { useVerifyMutation } from '../Services/Login';
import '../Css/Create.css'
import { Button, Form } from 'react-bootstrap';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Create:React.FC<any> = () => 
{
   const [Verify, { data, error, isLoading, isSuccess, isError } ] = useVerifyMutation(); 
   const nav = useNavigate();
   const editor = React.useRef(null);
    /*
    useEffect(()=> {
        Verify({'token': localStorage.getItem('token')});
    },[])
    
    useEffect(()=> {
        if (data.verify == "true")
        {

        } else {

        }
    },[data.isLoading])
    */   
    return (
        <div className="createcontainer">
            <div className="left-content">
            </div>
            <div className="center-content">
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label className="blog-title-text">Blog Title</Form.Label>
                    <Form.Control type="title" placeholder="Enter blog title" />
                    </Form.Group>
                    <Form.Group className="mb-3 outline" controlId="formBlogEntry">

                        <Editor
                          wrapperClassName="wrapper-class"
                          editorClassName="editor-class"
                          toolbarClassName="toolbar-class"
                          
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
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