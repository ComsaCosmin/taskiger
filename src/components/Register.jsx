import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [validated, setValidated] = useState(false);
  const [registrationError, setRegistrationError] = useState('');

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
      try {
        const response = await axios.post('http://localhost:3000/users', formData);
        console.log('User registered:', response.data);
        // Handle successful registration (e.g., redirect to login page)
      } catch (error) {
        console.error('Registration failed:', error);
        setRegistrationError('Registration failed. Please try again.');
        // Handle registration failure (e.g., display error message)
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Register</h2>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" name="username" value={formData.username} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please provide a username.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please provide a valid email address.</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
          <Form.Control.Feedback type="invalid">Please provide a password.</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        {registrationError && <Alert variant="danger" className="mt-3">{registrationError}</Alert>}
      </Form>
    </Container>
  );
};

export default Register;
