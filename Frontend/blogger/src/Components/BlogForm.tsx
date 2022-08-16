import { Editor } from "react-draft-wysiwyg";
import React, {useEffect, useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../Css/Create.css'
import { EditorState,ContentState, convertToRaw,convertFromRaw  } from "draft-js";


const BlogForm:React.FC<any> = ({title, titleChange,change, submitBlog, contentState, type}) =>
{
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
    const [ content, setContent ] = useState(raw);
    const [ loaded, setLoaded] = useState(false);
    const [ editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    const editor = useRef(null)

    useEffect(() => {
       if (contentState && type == "edit" && loaded === false)
       {
            const newContentState = convertFromRaw(contentState);
            setEditorState(EditorState.createWithContent(newContentState));
            setLoaded(true);
       }
    }, [titleChange,title, contentState, loaded])


    const onContentStateChange = (state:any) =>
    {
        ///*onContentStateChange={onContentStateChange}*/ 
        //setContent(EditorState.currentContent());
        //console.log(content)
        //change(state)
        setEditorState(state)
        const raw = convertToRaw(editorState.getCurrentContent());

        change(raw)
    }

    useEffect(() => {
        /*
        if (contentState)
        {
           // const state = ContentState.createFromBlockArray(contentState.contentBlock,contentState.entityMap)
            setContent((prev) => contentState)


        }
        */
       //setEditorState(EditorState.createEmpty());
    }, []); //[onContentStateChange,contentState,change])

    const submit = (event:any) =>
    {
        //onContentStateChange
        const raw = convertToRaw(editorState.getCurrentContent());
        event.preventDefault();
        submitBlog(event,raw);
    }


    return (
        <>
                <Form>
                    <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label className="blog-title-text">Blog Title</Form.Label>
                    <Form.Control type="title" placeholder="Enter blog title"  onChange={titleChange} value={title}  />
                    </Form.Group>
                    <Form.Group className="mb-3 outline" controlId="formBlogEntry">
                        <Editor
                          ref={editor} 
                          editorState={editorState}     
                          wrapperClassName="wrapper-class"
                          toolbarClassName="toolbar-class"
                          editorClassName="editorStyle"
                          onEditorStateChange={onContentStateChange}
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

