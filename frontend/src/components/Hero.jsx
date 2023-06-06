import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Hero = () => {
  return (
    <div className="py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 w-50 d-flex flex-column align-items-center bg-light text-center">
          <h1 className="mb-4">About this App</h1>
          <p className="mb-4">
            This is a boilerplate MERN authentication app that stores a JWT in
            an HTTP-Only cookie. This application also uses Redux Toolkit and
            the React Bootstrap library 🎉
          </p>
          <div className="d-flex">
            <LinkContainer to="/login">
              <Button variant="outline-primary" className="me-3">
                Login
              </Button>
            </LinkContainer>
            <LinkContainer to="/register">
              <Button variant="outline-secondary">Signup</Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;
