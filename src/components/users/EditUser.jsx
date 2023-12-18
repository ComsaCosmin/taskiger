import { Modal, Button, Container, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function EditUser({ modalState, onCloseClick, user }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Function to call when the component mounts (page loads)
    setFirstName(returnUserObject().firstName);
    setLastName(returnUserObject().lastName);
    setEmail(returnUserObject().email);
  }, []);

  function returnUserObject() {
    return JSON.parse(localStorage.getItem("userObject"));
  }

  const editUserAction = () => {
    axios
      .patch(`http://localhost:3000/users/${returnUserObject().id}`, {
        firstName: firstName,
        lastName: lastName,
        password: password,
      })
      .then((res) => {
        // setIsLoggedIn(true);
        onCloseClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Modal show={modalState} onHide={onCloseClick}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="mt-4">
            <Form>
              <Form.Group controlId="firstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>email:</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Form>
            <Form.Group controlId="password">
              <Form.Label>password:</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={editUserAction}>
            Save profile information
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditUser;
