import React, { useState } from "react";
import { Form, Button, Alert, Card, Navbar, Container } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "./Toast";

const Login = ({ setIsLoggedIn }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [validated, setValidated] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    axios
      .post(`http://localhost:3000/login`, formData)
      .then((res) => {
        moveToDashboard();
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("userObject", JSON.stringify(res.data.user));
        showToast("You are logged in!", "success");
      })
      .catch((error) => {
        showToast(`Login failed: ${error.response.data}`, "error");
      });
  };

  function moveToRegister() {
    navigate("/register");
  }

  function moveToDashboard() {
    navigate("/dashboard");
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">TASKIGER</Navbar.Brand>
          <Navbar.Toggle />
        </Container>
      </Navbar>
      <div className="container mt-4 d-flex flex-column align-items-center">
        <h2>Login</h2>
        <Card className="p-4" style={{ width: "30rem" }}>
          <Form noValidate validated={validated} onSubmit={handleLogin}>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                required
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mt-4" controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
            <Button className="mt-4" type="submit">
              Login
            </Button>
          </Form>
        </Card>

        <div className="mt-2" onClick={moveToRegister}>
          New here? Register now!
        </div>
      </div>
    </>
  );
};

export default Login;
