import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [register, { isLoading }] = useRegisterMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (registerInfo.password !== registerInfo.password2) {
      toast.error("Passwords don't match");
    } else {
      try {
        // What do I need to do?
        // 1. Register API Call
        const res = await register({
          name: registerInfo.name,
          email: registerInfo.email,
          password: registerInfo.password,
        }).unwrap();
        // 2. Set Credentials in local storage
        dispatch(setCredentials({ ...res }));
        // 3. Navigate to home
        navigate("/");
      } catch (error) {
        // Show error w/ toast
        toast.error(error?.data?.message || error.error);
      }
    }
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
              placeholder="John Doe"
              value={registerInfo.name}
              name="name"
              onChange={handleChange}
              style={{ fontSize: "14px" }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-normal">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="jdoe@gmail.com"
              value={registerInfo.email}
              name="email"
              onChange={handleChange}
              style={{ fontSize: "14px" }}
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
              style={{ fontSize: "14px" }}
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
              style={{ fontSize: "14px" }}
            />
          </Form.Group>

          {isLoading && <Loader />}

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
