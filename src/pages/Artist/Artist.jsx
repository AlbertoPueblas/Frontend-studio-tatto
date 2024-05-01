import "./Artist.css"
import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import { bringAllArtist, bringAllJobs } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "react-bootstrap";

//---------------------------------------------

export const Artist = () => {

  const [artist, setArtist] = useState([])
  const [show, setShow] = useState()
    const navigate = useNavigate()
  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);


    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token
    const userType = userReduxData.decoded.userRole

    useEffect(() => {
        const fetchArtist = async () => {
          const res = await bringAllArtist(token)
          console.log(res.data.artist);
          setArtist(res.data.artist)
        }
        fetchArtist()
      }, [])

      const deleteUserStepOne = (id) => {
        if (areYouDeletingMe === id) {
          setAreYouDeletingMe(null);
        } else {
          setAreYouDeletingMe(id);
        }
      };
    

    return(
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
        {artist.length > 0 ? (
        <>
            {artist.map((art) => {
              return (
                <tr>
                <th>{art.id}</th>
                    <th>{art.firstName}</th>
                <th>{art.lastName}</th>
                  <th>{art.email}</th>

                  <th>
                    <div className="userList">
                      <div className="showButton"
                        onClick={() => setShow((true), fetchDates(art.id),fetchProfile(art.id))}>
                      </div>
                      <div className="deleteButton" onClick={
                        () => deleteUserStepOne(art._id)}></div>
                      <div
                        className={
                          // botón de confirmación de borrado

                          areYouDeletingMe === art._id
                            ? "deleteButton confirmDelete "
                            : "deleteButton confirmDelete display-none"
                        }
                        // onClick={() => deleteUser((art.id),
                        //   navigate("/"),
                        //   setTimeout(() => {
                        //   navigate("/Admin")
                        // }),)}

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

          <Tab eventKey="dates" title="Dates">
            {artist.length > 0 &&
              artist.map((dates) => (
                <tr>
                  <th key={dates.jobs}></th>
                  <th>Appointment id: {dates.jobs}</th>
                </tr>
              ))}
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            Tab content for Contact
          </Tab>
        </Tabs>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </div> </>)
    : (<Navigate to = "/" />)
    }
    </>
    )
}

export default Artist