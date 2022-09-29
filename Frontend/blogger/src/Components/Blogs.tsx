import React, { useEffect, useState } from 'react'
import {  Button, Nav, Table } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import Layout from './Layout'
import '../Css/Blogs.css'
import 'react-toastify/dist/ReactToastify.css';
import { useBlogsMutation } from '../Services/Blog'
import { Post } from '../Models/Post'
import Moment from 'moment';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useDeleteMutation } from '../Services/Blog'

const Blogs:React.FC<any> = (props) =>
{
    const [variant, setVariant] = useState(false);
    const [ Blogs, { data, error, isLoading, isSuccess, isError } ] = useBlogsMutation(); 
    const [ deletePost, deleteResult = { data, error, isLoading, isSuccess, isError } ] = useDeleteMutation(); 
    const nav = useNavigate();
    const [ errorContainer, setErrorContainer ]  = useState({ display: "none" });
    const [ hasTriggerMessage, setHasTriggerMessage] = useState(false);
    const [ messager, setMessager] = useState("");
    const {msg} = useParams();

    useEffect(() => {
        if (deleteResult.isSuccess)
        {
           // toast.success('Post successfully deleted',{position: toast.POSITION.TOP_CENTER});

            Blogs({
                token: localStorage.getItem('token')
            })
        }
    },[deleteResult.isLoading])

    useEffect(() => {
        if (isSuccess)
        {
            if (data.Success == "false")
            {
                localStorage.removeItem('token');
                
                window.dispatchEvent(new Event("storage"));
              
                nav('/')
            } 
        }
    },[isLoading])

    useEffect(() => {
        Blogs({
            token: localStorage.getItem('token')
        })
        if (variant == false)
        {
            window.addEventListener('error', () => {
            //toast.success('successfully created!',{position: toast.POSITION.TOP_CENTER});

            setVariant(true);
        });
       // setVariant((prev) => "testing");
         }

    }, [])


    useEffect(() => {
    },[setMessager,messager])

    /*
    window.addEventListener("blog_success", () => {
        setErrorContainer({ display: "inline" })
        
        let timeout = setTimeout(() => {
            setMessager((prevMessager) => "Blog Created!")
            //setMessager("hello world!");
            alert('test')
            clearTimeout(timeout);
        }, 10000);

    }, true)
    */

    const formatDate = (time:any) => 
    {
        Moment.locale('en');
        return Moment(time).format('MMM d YYYY')
    }
    
    const navigateToEditPage = (event:any, id:number) =>
    {
        nav('/edit/' + id);
    }

    const onDelete = (event:any, id:number) =>
    {
        deletePost({ id: id, token: localStorage.getItem("token")  })
    }

    const mapBlogEntries = (mapData:[]) => (
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
                        <i className="bi bi-trash" onClick={e => onDelete(e, post.id)}></i>
                    </span>
                </td>

			</tr>
		)
	)

	);
    
    const blog = () =>
    (
        <>
                { msg == "blog_success" ? 
                    (
                        <div className="message">
                            Blog created!
                        </div>
                    ):
                    (
                        <></>
                    )
                }
                {
                    deleteResult.isSuccess ?
                    (
                        <div className="message">
                            Successfully deleted!
                        </div>

                    ):
                    (
                        <></>
                    )

                }
            <div>
                <Button variant="primary" onClick={()=> { nav('/create') }}>Create</Button>
            </div>
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
                            <> { data.Success != "false" ? mapBlogEntries(data.Success): <>Error!</> }  </>
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