import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../app/slice/userSlice';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { bringAppointment, bringDates } from '../../services/apiCalls';


export const Appointment = () => {
  const [userData, setUserData] = useState({})

  const userReduxData = useSelector(getUserData)
  const token = userReduxData.token

      const fetchDates = async (userId) => {
        const res = await bringDates(userId, token)
        setUserData(res.data.clientDates)
      }
      console.log(userData)
    fetchDates(userData)

  return (

    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Body>
        <Tabs
      defaultActiveKey="home"
      transition={false}
      id="noanim-tab-example"
      className="mb-3"
    >  
    </Tabs>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  )
};
