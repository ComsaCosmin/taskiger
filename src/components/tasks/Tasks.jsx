
import { ListGroup, ButtonGroup,Button  } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import EditTask from './EditTask'
import axios from 'axios'

function Tasks({taskRefresh}) {
    useEffect(() => {
        // Function to call when the component mounts (page loads)
        getAllTasks();
      }, [taskRefresh]);
      
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [tasks, setTasks] = useState();
    function getAllTasks() {
        axios.get(`http://localhost:3000/tasks`).then(res => {
            // setIsLoggedIn(true);
            setTasks(res.data)
          }).catch(error => {
            console.log(error)
          });
    };

    function completeTask(task) {
        axios.patch(`http://localhost:3000/tasks/${task.id}`, {
            state: 'completed',
        }).then(res => {
            // setIsLoggedIn(true);
            getAllTasks()
          }).catch(error => {
            console.log(error)
          });
    };

    function deleteTask(task) {
        axios.delete(`http://localhost:3000/tasks/${task.id}`).then(res => {
            // setIsLoggedIn(true);
            getAllTasks()
          }).catch(error => {
            console.log(error)
          });
    };


    const closeModal = (test) => {
        handleClose()
    }

   
  return (
    <>
    <ListGroup className="d-flex">
    {tasks?.map((task) => (
        <ListGroup.Item  key={task.id} className="d-flex justify-content-between">
            <div className="font-size-20">{task.name} <i className={task.state == "completed" ? 'completed-task' : 'pending-task'}>{task.state}</i></div>
            <div>{task.description}</div>
        <ButtonGroup aria-label="Basic example">
         <Button variant="success" onClick={() => {completeTask(task)}}>Complete</Button>
            <Button variant="dark"  onClick={handleShow}>Edit</Button>
            <Button variant="dark" onClick={() => {deleteTask(task)}}>Delete</Button>
        </ButtonGroup>
        <EditTask modalState={show} onCloseClick={closeModal}  getAllTasks={getAllTasks} task={task}/>
        </ListGroup.Item>
        ))}
    </ListGroup>
  </>
  );
}

export default Tasks;