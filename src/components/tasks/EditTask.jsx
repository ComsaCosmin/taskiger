
import { Modal, Button, Container,Form  } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios'

function AddTask({modalState, onCloseClick, getAllTasks, task}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Function to call when the component mounts (page loads)
        setName(task.name)
        setDescription(task.description)
      }, []);

    function returnUserObject() {
        return JSON.parse(localStorage.getItem('userObject'))
    }

    const saveTask = () => {
        axios.patch(`http://localhost:3000/tasks/${task.id}`, {
            name: name,
            description: description,
            userId: returnUserObject().id,
            state: 'pending',
          }).then(res => {
            // setIsLoggedIn(true);
            getAllTasks()
           onCloseClick()
          }).catch(error => {
            console.log(error)
          });
    }
  return (
    <>
    <Modal show={modalState} onHide={onCloseClick}>
      <Modal.Body><Container className="mt-4">
      <h2 className="mb-4">Register</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>description:</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </Container></Modal.Body>
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