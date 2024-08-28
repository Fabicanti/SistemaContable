import { Button, NavbarCollapse } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export const Head = ({ login = false }) => {

    const navigate = useNavigate();

    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand>Sistema contable</Navbar.Brand>
                    <NavbarCollapse>
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => navigate("/")}>inicio</Nav.Link>
                        </Nav>


                        {login ? <Button onClick={() => navigate("/")} variant="outline-success">Cerrar sesion</Button>
                            : <Button onClick={() => navigate("/login")} variant="outline-success">Iniciar sesion</Button>}
                    </NavbarCollapse>
                </Container>

            </Navbar >
        </>
    );
}