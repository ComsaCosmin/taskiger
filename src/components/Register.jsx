import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import axios from "axios";
import { useToast } from "./Toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [validated, setValidated] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity() === true) {
      await axios
        .post(`http://localhost:3000/users`, formData)
        .then(() => {
          moveToLogin();
          showToast("Account created successfuly!", "success");
        })
        .catch((error) => {
          console.log(error);
          showToast(`Registration failed: ${error.response.data}`, "error");
        });
    }
  };

  function moveToLogin() {
    navigate("/");
  }

  return (
    <Container className="container mt-4 d-flex flex-column align-items-center">
      <h2 className="mb-4">Register</h2>
      <Card className="p-4" style={{ width: "30rem" }}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label>First name:</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your first name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label>Last name:</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your last name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email address.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
          {registrationError && (
            <Alert variant="danger" className="mt-3">
              {registrationError}
            </Alert>
          )}
        </Form>
      </Card>
    </Container>
  );
};

export default Register;
