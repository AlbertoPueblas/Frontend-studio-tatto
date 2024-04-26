import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


export const Appointment = () => {
  const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
      });

      const inputHandler = (e) => {
        setProfileData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };
    
      const myPassport = useSelector(getUserData)

      const token = myPassport.token;

  return (
    // (
    //     <>
    //       <BootstrapModal
    //         profileData={profileData}
    //         inputHandler={inputHandler}
    //         token={token} />
    //     </>
    //     ),
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
      {/* <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="Home">
      </Tab>
      <Tab eventKey="profile" title="Profile">
        Tab content for Profile
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs> */}

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default Appointment;