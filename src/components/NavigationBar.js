import './App.css';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginModal from './ModalLogin'

function NavigationBar() {
    return (
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#"  style={{ color: 'white'}}>Movie Database</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            </Nav>
            <Form className="d-flex">
            <LoginModal/>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default NavigationBar;