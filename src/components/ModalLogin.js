import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function LoginModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>Login</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ border: 0, color : "White"}}  closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Invalid email address')
                .required('Email address'),
              password: Yup.string()
                .required('Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              axios.get(`https://api.themoviedb.org/3/authentication/token/new?api_key=4e7a03dbaaf7eee729bb7b9746df6b28`).then(response => {
                const request_token = response.data.request_token;
                axios.post(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=4e7a03dbaaf7eee729bb7b9746df6b28`, {
                  username: values.email,
                  password: values.password,
                  request_token: request_token
                }).then(response => {
                  axios.post(`https://api.themoviedb.org/3/authentication/session/new?api_key=4e7a03dbaaf7eee729bb7b9746df6b28`, {
                    request_token: request_token
                  }).then(response => {
                    alert("Login success");
                    setSubmitting(false);
                    handleClose();
                  }).catch(error => {
                    alert("Login failed");
                    setSubmitting(false);
                  });
                }).catch(error => {
                  alert("Invalid email or password");
                  setSubmitting(false);
                });
              }).catch(error => {
                alert("Error");
                setSubmitting(false);
              });
            }}
          >
            {formik => (
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{ color :"white"}}>Email address :</Form.Label>
                  <Form.Control type="text" name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder="Enter email" />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={{ color :"white"}}>Password :</Form.Label>
                  <Form.Control type="password" name="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder="Password" />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                </Form.Group>
                <Modal.Footer style={{ border: 0 }} >
                  <Button variant="warning" style={{ marginTop: "15px"}} type="submit" disabled={formik.isSubmitting}>submit</Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        
      </Modal>
    </>
  );
}

export default LoginModal;
