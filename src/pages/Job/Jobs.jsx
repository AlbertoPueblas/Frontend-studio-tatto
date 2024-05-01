import { useEffect, useState } from "react";
import "./Jobs.css"
import Table from 'react-bootstrap/Table';
import { bringAllJobs } from "../../services/apiCalls";
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { Navigate, useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "react-bootstrap";


//--------------------------------

export const Job = () => {

  const [jobs, setJobs] = useState([])
  const [show, setShow] = useState()
    const navigate = useNavigate()
  const [areYouDeletingMe, setAreYouDeletingMe] = useState(null);


    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token
    const userType = userReduxData.decoded.userRole

    useEffect(() => {
        const fetchJobs = async () => {
          const res = await bringAllJobs(token)
          console.log(res.data.jobs);
          setJobs(res.data.jobs)
        }
        fetchJobs()
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
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.length > 0 ? (
        <>
            {jobs.map((job) => {
              return (
                <tr>
                <th>{job.id}</th>
                  <th key={job.jobs}>
                <th>{job.id}</th>
                    {job.jobs}</th>

                  <th>
                    <div className="userList">
                      <div className="showButton"
                        onClick={() => setShow((true), fetchDates(job.id),fetchProfile(job.id))}>
                      </div>
                      <div className="deleteButton" onClick={
                        () => deleteUserStepOne(job._id)}></div>
                      <div
                        className={
                          // botón de confirmación de borrado

                          areYouDeletingMe === job._id
                            ? "deleteButton confirmDelete "
                            : "deleteButton confirmDelete display-none"
                        }
                        // onClick={() => deleteUser((job.id),
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
            {jobs.length > 0 &&
              jobs.map((dates) => (
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

export default Job