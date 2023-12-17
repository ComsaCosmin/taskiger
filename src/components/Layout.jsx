import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    
       axios.post(`http://localhost:3000/login`, {
        email: username,
        password: password
      }).then(res => {
        // setIsLoggedIn(true);
        localStorage.setItem('token', res.data.accessToken)
        localStorage.setItem('userObject', JSON.stringify(res.data.user))
      }).catch(error => {
        console.log(error)
      });
  };

  function moveToRegister() { 
    navigate('/register')
  }

  return (
    <div className="container mt-4">
      <h2>Login</h2>
      <Form>
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button onClick={handleLogin}>Login</Button>
      </Form>

      <Button onClick={moveToRegister}>Register</Button>
    </div>
  );
};

export default Login;
    