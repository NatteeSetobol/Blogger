import React from 'react';
import { useEffect, useState} from 'react';
import { Button, Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import '../Css/NaviBar.css'

const Navibar:React.FC<any> = () => {
    const nav = useNavigate();
    const [ refreshed, setRefreshed ] = useState(true);
    const [ logText, setLogText ] = useState("Login")
    const [ isLogin, setLogin ] = useState(false)
    const [ show, setShow ] = useState(false)


    useEffect(() => {
        checkToken();
    }, [])

    useEffect(() => {

    },[isLogin]);

    const checkToken = () => {
        if (localStorage.getItem('token') != null)
        {
            setLogin(true)
            setLogText("Logoff")
            setShow(true)
        } else {
            setLogin(false)
            setLogText("Login");
            setShow(false)
        }
    }
    
    window.addEventListener('storage', () => {
        setRefreshed(!refreshed)
        checkToken();
    })

    const onClick = () => {
        if (isLogin == false)
        {
            nav('/login')
        } else {
            localStorage.removeItem('token')
            setLogin(false)
            setLogText("Login");
            setShow(false)
            nav('/')
        } 
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <img src="/blogger.svg" alt="image" className="logo"/>
                    <Navbar.Brand href="/">Blogger</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        { show &&  <Nav.Link onClick={()=> { nav('/myblogs') }} >My Blog</Nav.Link> }
                    </Nav>
                    {
                        isLogin === true ? (
                            <span className="profilePic">
                             <img src="user-default.svg" width="32" height="32"></img>
                             </span>
                        ) : 
                        (
                            <></>
                        )
                    }
                    <span>

                        <Nav className="me-auto">
                        <Nav.Link onClick={onClick } > { logText } </Nav.Link>
                        </Nav>
                    </span>
                </Container>
            </Navbar>
        </>
    )
}

export default Navibar;


