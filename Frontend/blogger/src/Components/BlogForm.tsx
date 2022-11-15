import { Editor } from "react-draft-wysiwyg";
import React, {useEffect, useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import '../Css/BlogForm.css'
import { EditorState,ContentState, convertToRaw,convertFromRaw  } from "draft-js";


const BlogForm:React.FC<any> = ({title, titleChange,change, submitBlog, contentState, type}) =>
{
    let _contentState = ContentState.createFromText('Sample content state');
    const raw = convertToRaw(_contentState)
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
        setEditorState(state)
        const raw = convertToRaw(editorState.getCurrentContent());

        change(raw)
    }

    const submit = (event:any) =>
    {
        const raw = convertToRaw(editorState.getCurrentContent());
        event.preventDefault();
        submitBlog(event,raw);
    }

    return (
        <div >
            <Form>
                <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label className="blog-title-text">Blog Title</Form.Label>
                <Form.Control type="title" placeholder="Enter blog title"  onChange={titleChange} value={title} name="title" />
                </Form.Group>
                <Form.Group className="mb-3 outline RichEditor" controlId="formBlogEntry">
                <Editor
                    ref={editor} 
                    editorState={editorState}     
                    toolbarClassName="toolbar-class"
                    editorClassName="editorStyle"
                    onEditorStateChange={onContentStateChange}
                    
                />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submit}>
                    Submit
                </Button>
            </Form>
        </div>
    );
}

export default BlogForm;


