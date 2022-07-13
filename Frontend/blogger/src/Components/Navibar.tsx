import { Button, Container, Form } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

const Navibar:React.FC<any> = () => {
    const nav = useNavigate();
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Blogger</Navbar.Brand>
                        <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Button onClick={()=>nav('/login')}>Login</Button>
                </Container>
            </Navbar>
        </>
    )
}

export default Navibar;


