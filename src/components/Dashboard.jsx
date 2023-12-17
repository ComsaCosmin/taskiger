import React, { useState } from 'react';
import { Row, Button, Container } from 'react-bootstrap';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import AddTask from './tasks/AddTask'
import Tasks from './tasks/Tasks'

const Dashboard = () => {
    const navigate = useNavigate();
    const [taskRefresh, setTaskRefresh] = useState('false')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function moveToRegister() { 
        navigate('/register')
    }

    const closeModal = (test) => {
        handleClose()
    }

    const refreshTask = () => {
        setTaskRefresh('test')
    }

    return (
        <Container>
        <Row>
        <h1>Tasks</h1>
        <Tasks taskRefresh={taskRefresh}/>
        <Button variant="primary" onClick={handleShow}>Add new Task</Button>
        <AddTask modalState={show} onCloseClick={closeModal} onTaskAdd={refreshTask}/>
        </Row>
        </Container>
    );
};

export default Dashboard;
    