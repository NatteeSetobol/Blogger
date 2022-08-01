import { Editor } from "react-draft-wysiwyg";
import React from 'react'
import { Button, Form } from 'react-bootstrap';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../Css/Create.css'



const BlogForm:React.FC<any> = ({titleChange,change, submitBlog}) =>
{
    const submit = (event:any) =>
    {
        event.preventDefault();
        submitBlog();
    }
    return (
        <>
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
                    <Button variant="primary" type="submit" onClick={submit}>
                        Submit
                    </Button>
                </Form>
        </>
    );
}

export default BlogForm;