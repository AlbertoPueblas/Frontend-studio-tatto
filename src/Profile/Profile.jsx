import { useEffect, useState } from "react";
import { CustomInput } from "../components/CustomInput/CustomInput";
import { bringAppointment, bringDates, bringProfile, loginOut } from "../services/apiCalls";
import { ButtonC } from "../components/ButtonC/ButtonC";
// import { deleteUser } from "../services/apiCalls";
import { inputValidator } from "../utils/validators";
import BootstrapModal from "../components/BootstrapModal/BootstrapModal";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getUserData, logout, } from "../app/slice/userSlice";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


//---------------------------------------------------------------------------

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [userData, setUserData] = useState([{}]);
  const [oneUser, setOneUser] = useState({})
  const [isEditing, setIsEditing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  const dispatch = useDispatch()
  const navigate = useNavigate()

  const myPassport = useSelector(getUserData)

  const token = myPassport.token;


  const inputHandler = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      [e.target.date]: e.target
    }));
  };


  useEffect(() => {
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      setProfileData(myProfileData);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchDates = async () => {
      const res = await bringDates(token);
      console.log(res.clientDates);
      setUserData(res.clientDates);
    };
    fetchDates();
  }, []);

  const logOutMe = () => {
    dispatch(logout())
  }

  const handleClose = () => {
    navigate("/");
    setTimeout(() => {
      navigate("/Profile")
    });
  }

  return (
    <>
      <CustomInput
        typeProp="text"
        nameProp="firstName"
        placeholderProp="firstName"
        value={profileData.firstName}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
        />
      <CustomInput
        typeProp="text"
        nameProp="lastName"
        placeholderProp="lastName"
        value={profileData.lastName}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <Card style={{ width: '25rem' }}>
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Profile">
            <CustomInput
              typeProp="text"
              nameProp="firstName"
              placeholderProp="firstName"
              value={profileData.firstName}
              isDisabled={!isEditing}
              handlerProp={inputHandler}
            />
            <CustomInput
              typeProp="text"
              nameProp="lastName"
              placeholderProp="lastName"
              value={profileData.lastName}
              isDisabled={!isEditing}
              handlerProp={inputHandler}
            />
            <CustomInput
              typeProp="email"
              nameProp="email"
              placeholderProp="email"
              value={profileData.email}
              isDisabled={!isEditing}
              handlerProp={inputHandler}
            />
            <>
              <BootstrapModal
                profileData={profileData}
                inputHandler={inputHandler}
                token={token} />
            </>
          </Tab>
          <Tab eventKey="dates" title="Dates">
            {userData.length > 0 &&
              userData.map((dates) => (
                <tr>
                  <th key={dates.id}></th>
                  <th>Appointment id: {dates.id}</th>
                  <th>Appointment: {dates.appointmentDate}</th>
                  {/* <th>User: <br></br>{dates.userId}</th> */}
                  <th>Artist id: {dates.tattoArtistId}</th>
                </tr>
              ))}
            <Button variant="primary">modify appointment</Button>
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            Tab content for Contact
          </Tab>
        </Tabs>
        <Card.Body>
          <Button onClick={() => {
            logOutMe()
            navigate("/Home")
          }}>log out</Button>
        </Card.Body>
      </Card>
    </>
  );
};