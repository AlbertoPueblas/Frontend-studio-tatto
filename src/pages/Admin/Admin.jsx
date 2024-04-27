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
    const [oneUser, setOneUser] = useState([])
    const [userData, setUserData] = useState({})
    const [show, setShow] = useState()
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

        const fetchDates = async (userId) => {
            const res = await bringAppointment(userId, token)
            console.log(res.data.clientDates);
            setUserData(res.data.clientDates)
        }
    useEffect(() => {
        setUserData(userData)
    }, [userData])
    
    const fetchProfile = async (userId) => {
      const res = await getUserById(userId, token)
      console.log(res.data.user)
      setOneUser(res.data.user)
    };
    
    useEffect(() => {
      setOneUser(oneUser)
    },[oneUser])
    
    const deleteUser = async (id) => {
        const res = await deleteUserId(id, token)
        console.log(res);
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
                    onClick={() => setShow((true),fetchDates(user.id),fetchProfile(user))}>
                </div>
                <div className="deleteButton" onClick={
                    () => deleteUser(user.id)}></div>
                <div className="upgradeButton" onClick={
                    () => fetchProfile(user.id)}></div>
                </div>                                    
              </th>
            </tr>
        ))}

            </tbody>
        </Table>
        <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}>
      <Modal show={show}>
        
      <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Dates">
      {userData.length > 0 &&                          
            userData.map((dates) => (
                <tr>
                    <th key={dates.id}></th>
                    <th>Appointment id: {dates.id}</th>
                    <th>Appointment: {dates.appointmentDate}</th>
                    <th>User: <br></br>{dates.userId}</th>
                    <th>Artist id: {dates.tattoArtistId}</th>
                    </tr>
                ))}
      </Tab>
      <Tab eventKey="profile" title="Profile">
      {oneUser.length > 0 && 
      oneUser.map((user) => (
        <tr>
            <th key={user.data.id}></th>
            <th>{user.data.id}</th>
            <th>{user.data}</th>
        </tr>
        ))}
      </Tab>    
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
        </>
      );
    }