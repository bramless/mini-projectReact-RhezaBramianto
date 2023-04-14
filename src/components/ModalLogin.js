import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogin = (event) => {
    // kode untuk melakukan login
    event.preventDefault();
    handleClose();
  }

  return (
    <>
      <Button variant="warning" onClick={handleShow}>Login</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ border: 0, color : "White"}}  closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color :"white"}}>Email address / Username :</Form.Label>
              <Form.Control type="email text" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color :"white"}}>Password :</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
            </Form.Group>
            <Modal.Footer style={{ border: 0 }} >
              <Button variant="warning" style={{ marginTop: "15px"}} type="submit">submit</Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default LoginModal;
