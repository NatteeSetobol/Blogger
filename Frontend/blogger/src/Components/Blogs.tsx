import React, { useEffect, useState } from 'react'
import { Alert, Button, Nav, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import Layout from './Layout'
import '../Css/Blogs.css'
import { toast } from 'react-toastify'
import { useBlogsMutation } from '../Services/Blog'
import { Post } from '../Models/Post'
import Moment from 'moment';
import 'bootstrap-icons/font/bootstrap-icons.css';


const Blogs:React.FC<any> = () =>
{
    const [variant, setVariant] = useState("");
    const [hidden, setHidden] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [ Blogs, { data, error, isLoading, isSuccess, isError } ] = useBlogsMutation(); 
    const nav = useNavigate();

    useEffect(() => {
        if (isSuccess)
        {
            if (data.Success == "false")
            {
                    localStorage.removeItem('token');
                    nav('/')
            } 
        
        }
    },[isLoading])

    useEffect(() => {
        Blogs({
            token: localStorage.getItem('token')
        })
    }, [])

    const formatDate = (time:any) => 
    {
        Moment.locale('en');
        return Moment(time).format('MMM d YYYY')
    }

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
    
    const navigateToEditPage = (event:any, id:number) =>
    {
        nav('/edit/' + id);
    }


    const mapIt = (mapData:[]) => (
		mapData.map((post:Post) => (
			<tr>
				<td>
					{post.id}
				</td>
				<td>
					{post.title}
				</td>
                    <div className="dates">
                    { formatDate(post.created.toString()) }
                    </div>
				<td>
                    <div className="dates">
                    { formatDate(post.updated.toString()) }
                    </div>
				</td>
                <td>
                    <span>
                        <i className="bi bi-file-earmark-binary-fill" onClick={e => navigateToEditPage(e, post.id)}></i>
                    </span>
                    <span>
                        <i className="bi bi-trash"></i>
                    </span>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    { isError ? (
										<> Sorry, an Error has occured. </>
									) : isSuccess ? (
										<> { data.Success != "false" ? mapIt(data.Success): <>Error!</> }  </>
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