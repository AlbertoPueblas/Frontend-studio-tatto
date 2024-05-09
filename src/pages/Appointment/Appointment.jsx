import { useSelector } from "react-redux"
import { getUserData } from "../../app/slice/userSlice"
import { useEffect, useState } from "react"
import {
  bringAllAppointment, bringAllUsers,
  deleteAppointmentId,
  deleteUserId,
  getUserById
} from "../../services/apiCalls"
import Table from 'react-bootstrap/Table';
import './Appointment.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import dayjs from "dayjs"
import { Navigate, useNavigate } from "react-router-dom";

//---------------------------------------------------------------------------------

export const Appointment = () => {
  const [users, setUsers] = useState([])
  const [oneUser, setOneUser] = useState({})
  const [userData, setUserData] = useState({})
  const [show, setShow] = useState()
  const navigate = useNavigate();
  const userReduxData = useSelector(getUserData)
  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);
  const token = userReduxData.token
  const userType = userReduxData.decoded.userRole

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await bringAllUsers(token)
      setUsers(res.data.users)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    const fetchAllAppointment = async () => {
      const res = await bringAllAppointment(token)
      console.log(res.data.dates);
      setUserData(res.data.dates)
    }
    fetchAllAppointment()
  }, [])


  const handleClose = () => {
    navigate("/");
    setTimeout(() => {
      navigate("/Admin")
    });
    console.log("close");
    setShow(false);
  }

    const deleteAppointment = async (id) => {
      const res = await deleteAppointmentId(id, token)
    };

    const deleteAppointmentStepOne = (id) => {
      if (areYouDeletingMe === id) {
        setAreYouDeletingMe(null);
      } else {
        setAreYouDeletingMe(id);
      }
    };


  return (
    <>
      {userType === "Admin"
        ? (<>
          <Table striped>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Date</th>
                <th>User Id</th>
                <th>Artist Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData.length > 0 ? (
                  <>
                    {userData.map((dates) => {
                      return (

                        <tr>
                          <th>{dates.id}</th>
                          <th>
                        {dayjs(dates.appointmentDate).format("dddd, MMMM D, YYYY h:mm A")}</th>
                          <th><br></br>{dates.userId}</th>
                          <th>{dates.tattoArtistId}</th>
                          <th>
                            <div className="userList">
                              <div className="showButton"
                                onClick={() => {setShow(true), fetchUser(users._id)}}>
                              </div>
                              <div className="deleteButton" onClick={
                                () => deleteAppointmentStepOne(dates.id)}></div>
                              {/* <div className="upgradeButton" onClick={
                                () => fetchUser(dates.id)}></div> */}
                                <div
                        className={
                          // botón de confirmación de borrado

                          areYouDeletingMe === dates._id
                            ? "deleteButton confirmDelete "
                            : "deleteButton confirmDelete display-none"
                        }
                        onClick={() => deleteAppointment((dates.id),
                        navigate("/Admin")
                        ,)}

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
                        <th>Appointment: {
                        dayjs(dates.appointmentDate).format("dddd, MMMM D, YYYY h:mm A")}</th>
                        <th>User: <br></br>{dates.userId}</th>
                        <th>Artist id: {dates.tattoArtistId}</th>
                        <th>Artist id: {dates.jobId}</th>
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
          </div></>)
        : (<Navigate to="/" />)
      }
    </>
  )
};