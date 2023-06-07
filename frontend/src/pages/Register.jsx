import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submit");
  };
  return (
    <>
      <Helmet>
        <title>Auth | Register</title>
      </Helmet>
      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-4">Register</h1>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="fw-normal">Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Name"
              value={registerInfo.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-normal">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={registerInfo.email}
              name="email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="fw-normal">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={registerInfo.password}
              name="password"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password2">
            <Form.Label className="fw-normal">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={registerInfo.password2}
              name="password2"
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Register
          </Button>
          <Row className="py-3">
            <Col>
              Already have an account? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};

export default Register;
