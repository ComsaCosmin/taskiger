
import { Modal, Button, Container,Form  } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios'

function AddTask({modalState, onCloseClick, onTaskAdd}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    function returnUserObject() {
        return JSON.parse(localStorage.getItem('userObject'))
    }

    const saveTask = () => {
        axios.post(`http://localhost:3000/tasks`, {
            name: name,
            description: description,
            userId: returnUserObject().id,
            state: 'pending',
          }).then(res => {
            // setIsLoggedIn(true);
           onTaskAdd()
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