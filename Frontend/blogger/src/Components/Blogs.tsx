import React, { useEffect, useState } from 'react'
import { Alert, Button, Nav, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Layout from './Layout'
import '../Css/Blogs.css'
import { toast } from 'react-toastify'
import { useBlogsMutation } from '../Services/Blog'
import { Post } from '../Models/Post'

const Blogs:React.FC<any> = () =>
{
    const nav = useNavigate();
    const [variant, setVariant] = useState("");
    const [hidden, setHidden] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [ Blogs, { data, error, isLoading, isSuccess, isError } ] = useBlogsMutation(); 

    useEffect(() => {
        if (isSuccess)
        {
            if (data.Success == "true")
            {
            } else {
            }
        }
    },[isLoading])

    useEffect(() => {
        Blogs({
            token: localStorage.getItem('token')
        })
    }, [])

    const setError = () =>
    {
        setVariant((prev) => 'success')
        setAlertMessage((prev) => "Successly posted!")
        setHidden((prev) => false)
    }

    window.addEventListener('success_blog_post', () => {
        setError();
        toast.success('successfully created!',{position: toast.POSITION.TOP_CENTER});
    })
    
    const mapIt = (mapData:[]) => (
		mapData.map((post:Post) => (
			<tr>
				<td>
					{post.id}
				</td>
				<td>
					{post.title}
				</td>
                    { post.created.toString() }
				<td>
                    { post.updated.toString() }
				</td>

			</tr>
		)
	)

	);
    
    const blog = () =>
    (
        <>
            <div>
                <Button variant="primary" onClick={()=> { nav('/create') }}>Create</Button>
            </div>
            <Alert key={variant} variant={variant} hidden={hidden}>
                { alertMessage }
            </Alert>
            <div>
               <Nav className="justify-content-center"  activeKey="published">
                    <Nav.Item>
                        <Nav.Link eventKey="published">Published</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="unpubish">UnPublished</Nav.Link>
                    </Nav.Item>
               </Nav>
            </div>
            <div className="publish_blog_listing">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Created</th>
                            <th>Last Update</th>
                        </tr>
                    </thead>
                    <tbody>
                    { isError ? (
										<> Sorry, an Error has occured. </>
									) : isSuccess ? (
										<> { mapIt(data.Success) }  </>
									) : isLoading ? (
										<> loading </>
									): null
						}
                    </tbody>
                </Table>
            </div>
            </>
    )

    
    return (
        <Layout content={blog}>
        </Layout>
    )
}

export  default Blogs;