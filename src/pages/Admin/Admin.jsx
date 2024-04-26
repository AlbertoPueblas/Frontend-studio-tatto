import { useSelector } from "react-redux"
import { getUserData } from "../../app/slice/userSlice"
import { useEffect, useState } from "react"
import { bringAllUsers, bringAppointment, deleteUserId, getUserById} from "../../services/apiCalls"
import Table from 'react-bootstrap/Table';
import './Admin.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useNavigate } from "react-router-dom";

//---------------------------------------------------------------------------------

export const Admin = () => {
    const [users, setUsers] = useState([])
    const [userData, setUserData] = useState({})
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token
    

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await bringAllUsers(token)
            setUsers(res.data.users)
        }
        fetchUsers()
    }, [])

    // useEffect(() => {

        const fetchDates = async (id) => {
            const res = await bringAppointment(id, token)
            setUserData(res)
        }
      //   fetchDates()
      // }, [])
    
    useEffect(() => {
        console.log(userData);
    }, [userData])
    

    const deleteUser = async (id) => {
        const res = await deleteUserId(id, token)
        console.log(res);
    };

    const getUser = async (id) => {
        const res = await getUserById(id, token)
        console.log(res,);
    };

    const handleClose = () => { 
        navigate("/");
        setTimeout(() => {
            navigate("/Admin")
        });
        console.log("close");
        setShow(false);
    }

      return (
        <>
        <Table striped>   
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
                <tr>
            <th>{user.id}</th>
            <th key={user.id}>
            {user.firstName}</th>
            <th>{user.lastName}</th>
            <th>{user.email}</th>
            <th>
                <div className="userList">
                    <div className="showButton" 
                    onClick={() => setShow((true),fetchDates(user.id))}>
                </div>
                <div className="deleteButton" onClick={
                    () => deleteUser(user.id)}></div>

                    <div className="upgradeButton" onClick={
                    () => getUser(user.id)}></div>
                </div>                                    
                </th>
            </tr>
        ))}

            </tbody>
        </Table>
        <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
      <Modal show={show} >
        
      <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Dates">

            {/* {users.map((dates) => (
                <tr>
                    <th key={dates.id}></th>
                    <th>{dates.clientDates}</th>
                    <th>{dates.email}</th>
                    <th>{dates.username}</th>
                    <div className="showButton" onClick={() => {
                        fetchDates()
                    }}></div>
                    </tr>
                ))} */}
      </Tab>
      <Tab eventKey="profile" title="Profile">
      {users.map((user) => (
                <tr>
            <th key={user.id}>
            {user.firstName}</th>
            <th>{user.lastName}</th>
            <th>{user.email}</th>
            </tr>
        ))}
      </Tab>
                
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
            {/* <Modal.Header closeButton onClick={handleClose}></Modal.Header> */}


        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
          {/* <Button variant="primary">Save changes</Button> */}
        </Modal.Footer>
      </Modal>
    </div>
        </>
      );
    }