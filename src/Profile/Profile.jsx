import { useEffect, useState } from "react";
import { CustomInput } from "../components/CustomInput/CustomInput";
import { bringDates, bringProfile } from "../services/apiCalls";
import BootstrapModal from "../components/BootstrapModal/BootstrapModal";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getUserData, logout, } from "../app/slice/userSlice";
import dayjs from "dayjs"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./Profile.css";
import { getAppointmentId } from "../app/slice/appointmentSlice";

//---------------------------------------------------------------------------

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [appDates, setAppDates] = useState({
    appointmentDate: "",
    jobId: "",
    tattoArtistId: "",
  })
  const [now, setNow] = useState(Date())
  const [userData, setUserData] = useState([{}]);
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState()
  const selectDate = useSelector(getAppointmentId)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const myPassport = useSelector(getUserData)
  const token = myPassport.token;


  const inputHandler = (e) => {
    setProfileData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,

    }));
  };

  const inputHandlerDate = (e) => {
    console.log(typeof (e.target.value), e.target.name);
    setAppDates((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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
  
      const selectAppointment = async () => {
        try {
            const res = await updateDate(selectDate, token);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
      <div className='calendar'>{dayjs(now).format
        ("dddd, MMMM D, YYYY h:mm A")}</div>
      <Card style={{ width: '40rem' }}>
        <Tabs
          defaultActiveKey="home"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab eventKey="home" title="Profile" >
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
                // <tr>
                //   <h5 className="modalDates">Appointment: {
                //     dayjs(dates.appointmentDate).format("dddd, MMMM D, YYYY h:mm A")
                //   }</h5>

                //   <h5 className="modalDates">Job:{dates.jobId}</h5>
                //   <h5 className="modalDates"> Artist:{dates.tattoArtistId}<br/></h5>
                //   <Button className="date"
                //     onClick={() => navigate("/prueba")}>
                //       update
                //   </Button>
                // </tr>
                <>
                  <CustomInput
                    typeProp="text"
                    nameProp="appointmentDate"
                    isDisabled={!isEditing}
                    placeholderProp={dayjs(dates.appointmentDate).format("dddd, MMMM D, YYYY h:mm A")}
                    inputHandler={inputHandlerDate}
                  />
                  <CustomInput
                    typeProp="text"
                    nameProp="jobId"
                    isDisabled={!isEditing}
                    placeholderProp={dates.jobId}
                    inputHandler={inputHandlerDate}
                  />
                  <CustomInput
                    typeProp="text"
                    nameProp="tattoArtistId"
                    isDisabled={!isEditing}
                    placeholderProp={dates.tattoArtistId}
                    inputHandler={inputHandlerDate}

                  />
                  <Button className="date"
                    onClick={() => {selectAppointment(),navigate("/prueba")}}>
                    update
                  </Button>
                </>
              ))}
            <Button variant="primary" onClick={() => {
              setShow(true),
                navigate("/appointmentDate")
            }}>
              Create Appointment
            </Button>
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            Tab content for Contact
          </Tab>
        </Tabs>
        <Card.Body>
          <Button variant="secondary" onClick={() => {
            logOutMe()
            navigate("/Home")
          }}>log out</Button>
        </Card.Body>
      </Card>
    </>
  );
};