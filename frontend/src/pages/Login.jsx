import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { Helmet } from "react-helmet";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [login, { isLoading }] = useLoginMutation();

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
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email: loginInfo.email,
        password: loginInfo.password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Auth | Login</title>
      </Helmet>

      <FormContainer>
        <Form onSubmit={handleSubmit}>
          <h1 className="mb-4">Login</h1>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-normal">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="jdoe@gmail.com"
              value={loginInfo.email}
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
              value={loginInfo.password}
              name="password"
              onChange={handleChange}
              style={{ fontSize: "14px" }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Login
          </Button>
        </Form>

        {isLoading && <Loader />}

        <Row className="py-3">
          <Col>
            Don't have an account? <Link to="/register">Register</Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  );
};

export default Login;
