import { Modal, Button, Container, Form, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

function AddTask({ modalState, onCloseClick, onTaskAdd }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [taskForUser, setTaskForUser] = useState("");

  useEffect(() => {
    // Function to call when the component mounts (page loads)
    returnAllUsers();
  }, []);

  function returnUserObject() {
    return JSON.parse(localStorage.getItem("userObject"));
  }

  const returnAllUsers = () => {
    axios.get(`http://localhost:3000/users`).then((res) => {
      setUsers(res.data);
    });
  };

  const saveTask = () => {
    console.log(taskForUser);
    if (taskForUser == "Select User" || taskForUser == "") {
      setError("Please select a user");
      return;
    }
    axios
      .post(`http://localhost:3000/tasks`, {
        name: name,
        description: description,
        user: taskForUser,
        state: "pending",
      })
      .then((res) => {
        // setIsLoggedIn(true);
        onTaskAdd();
        onCloseClick();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Modal show={modalState} onHide={onCloseClick}>
        <Modal.Body>
          <Container className="mt-4">
            <h2 className="mb-4">Add new task</h2>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Select Option</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    setTaskForUser(e.target.value);
                  }}
                >
                  <option>Select User</option>
                  {users?.map((user) => (
                    <option key={user.id} value={user.firstName}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </Form.Control>
                {error && <Alert variant="danger">{error}</Alert>}
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveTask}>
            Save task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTask;
