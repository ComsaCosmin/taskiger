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
  const [showForTask, setShowForTask] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCloseForTask = () => setShowForTask(false);
  const handleShowForTask = () => setShowForTask(true);

  function moveToRegister() {
    navigate("/register");
  }

  const closeModal = () => {
    handleCloseForTask();
    handleClose();
  };

  const refreshTask = () => {
    setTaskRefresh();
  };

  const returnUserObject = () => {
    return JSON.parse(localStorage.getItem("userObject"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userObject");
    navigate("/login");
  };

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">TASKIGER</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Hello:
              <span
                className="text-capitalize ms-1 show-pointer"
                onClick={handleShow}
              >
                {returnUserObject().firstName}
              </span>
              <span
                className="text-capitalize ms-1 text-primary show-pointer"
                onClick={logout}
              >
                Logout
              </span>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <h3 className="mt-4 pt-4">Your tasks</h3>
          <Tasks taskRefresh={taskRefresh} />
          <Button variant="primary" onClick={handleShowForTask}>
            Add new Task
          </Button>
          <AddTask
            modalState={showForTask}
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
