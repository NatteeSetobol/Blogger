import React from 'react';
import { useEffect, useState} from 'react';
import { Button, Container} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

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
            setLogText("Logon");
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
            setLogText("Logon");
            setShow(false)
        } 
    }

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Blogger</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        { show &&  <Nav.Link href="#home">New Blog Entry</Nav.Link> }
                    </Nav>
                     <Button onClick={ onClick }>{ logText }</Button>
                </Container>
            </Navbar>
        </>
    )
}

export default Navibar;


