import React, { useState } from "react";
import { Row, Button, Container, Navbar } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTask from "./tasks/AddTask";
import Tasks from "./tasks/Tasks";
import EditUser from "./users/EditUser";

const Dashboard = () => {
  const navigate = useNavigate();
  const [taskRefresh, setTaskRefresh] = useState("false");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function moveToRegister() {
    navigate("/register");
  }

  const closeModal = (test) => {
    handleClose();
  };

  const refreshTask = () => {
    setTaskRefresh("test");
  };

  const returnUserObject = () => {
    return JSON.parse(localStorage.getItem("userObject"));
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as:{" "}
              <a className="text-capitalize" onClick={handleShow}>
                {returnUserObject().username}
              </a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <h3 className="mt-4 pt-4">Your tasks</h3>
          <div onClick={handleShow}>Salut, {returnUserObject().username}</div>
          <Tasks taskRefresh={taskRefresh} />
          <Button variant="primary" onClick={handleShow}>
            Add new Task
          </Button>
          <AddTask
            modalState={show}
            onCloseClick={closeModal}
            onTaskAdd={refreshTask}
          />
        </Row>
        <EditUser
          modalState={show}
          onCloseClick={closeModal}
          user={returnUserObject}
        />
      </Container>
    </>
  );
};

export default Dashboard;
