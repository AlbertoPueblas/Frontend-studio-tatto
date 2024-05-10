import { useSelector } from "react-redux"
import { getUserData, logout } from "../../app/slice/userSlice"
import { useEffect, useState } from "react"
import {
  bringAllUsers,
  bringAppointment,
  deleteUserId,
  getUserById
} from "../../services/apiCalls"
import Table from 'react-bootstrap/Table';
import './Admin.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import dayjs from "dayjs"
import { Navigate, useNavigate } from "react-router-dom";

//---------------------------------------------------------------------------------

export const Admin = () => {
  const [users, setUsers] = useState([])
  const [oneUser, setOneUser] = useState({})
  const [userData, setUserData] = useState({})
  const [show, setShow] = useState()
  const navigate = useNavigate();
  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);
  
  const userReduxData = useSelector(getUserData)
  const token = userReduxData.token
  const userType = userReduxData.decoded.userRole

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await bringAllUsers(token)
      setUsers(res.data.users)
    }
    fetchUsers()
  }, [])

  const fetchDates = async (userId) => {
    const res = await bringAppointment(userId, token)
    setUserData(res.data.clientDates)
  }

  const fetchProfile = async (userId) => {
    const res = await getUserById(userId, token)
    setOneUser(res.data)
  };

  const deleteUser = async (id) => {
    const res = await deleteUserId(id, token)
  };

  const handleClose = () => {
    navigate("/");
    setTimeout(() => {
      navigate("/Admin")
    });
    console.log("close");
    setShow(false);
  }

  const deleteUserStepOne = (id) => {
    if (areYouDeletingMe === id) {
      setAreYouDeletingMe(null);
    } else {
      setAreYouDeletingMe(id);
    }
  };
  return (
    <>
    {userType ==="Admin"
    ?( <>   
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
        {users.length > 0 ? (
        <>
            {users.map((user) => {
              return (
                <tr>
                <th>{user.id}</th>
                  <th key={user.id}>
                    {user.firstName}</th>
                  <th>{user.lastName}</th>
                  <th>{user.email}</th>
                  <th>
                    <div className="userList">
                      <div className="showButton"
                        onClick={() => setShow((true), 
                        fetchDates(user.id),
                        fetchProfile(user.id)
                        )}>
                      </div>
                      <div className="deleteButton" onClick={
                        () => deleteUserStepOne(user._id)}></div>
                      <div
                        className={
                          // botón de confirmación de borrado

                          areYouDeletingMe === user._id
                            ? "deleteButton confirmDelete "
                            : "deleteButton confirmDelete display-none"
                        }
                        onClick={() => deleteUser((user.id),
                          navigate("/"),
                          setTimeout(() => {
                          navigate("/Admin")
                        }),)}

                      >Delete?  
                        
                    </div>
                    </div>
                  </th>
            </tr>
              );
            })}
          </>) : null}
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
          <Tab eventKey="home" title="Profile">
            <h6>User ID: {oneUser.id}</h6>
            <h6>Name: {oneUser.firstName}</h6>
            <h6>Last name: {oneUser.lastName}</h6>
            <h6>Email: {oneUser.email}</h6>
          </Tab>
          <Tab eventKey="dates" title="Dates">
            {userData.length > 0 &&
              userData.map((dates) => (
                <tr>
                  <th key={dates.id}></th>
                  <th>Appointment id: {dates.id}</th>
                  <th>Appointment: <br />{
                        dayjs(dates.appointmentDate).format("dddd, MMMM D,YYYY,h:mm A ")}</th>
                  <th>User: <br></br>{dates.userId}</th>
                  <th>Artist id: {dates.tattoArtistId}</th>
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
    </div> </>)
    : (<Navigate to = "/" />)
    }
    </>
  );
}