import { useEffect, useState } from "react";
import { MyInput } from "../../components/MyInput/MyInput";
import { bringDates, bringProfile, updateDate } from "../../services/apiCalls";
import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getUserData, logout, } from "../../app/slice/userSlice";
import dayjs from "dayjs"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import "./Profile.css";
import MyModal from "../../components/MyModal/MyModal";

//---------------------------------------------------------------------------

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [appDates, setAppDates] = useState({
    id: "",
    appointmentDate: "",
    jobId: "",
    tattoArtistId: "",
  })

  const [now, setNow] = useState(Date())
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState()
  // const selectDate = useSelector(getAppointmentId)

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
    console.log(e.target.name, e.target.value);
    setAppDates((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(appDates);
  };
  const handleUpdate = async (dates) => {
    try {
        console.log(dates, "hello");
        await updateDate(appDates, token);
        console.log("datos actualizados");
        setTimeout(() => {
        navigate("/Profile")
            setShow(false);
        },[2000])
    } catch (error) {
        console.log(error);
    }
};

  useEffect(() => {
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      setProfileData(myProfileData);
    };
    if(profileData.email === "") {
      fetchProfile();
    }
  }, [profileData]);

  useEffect(() => {
    const fetchDates = async () => {
      const res = await bringDates(token);

      setUserData(res.clientDates);
    };
    if(userData.length === 0) {
      fetchDates();
    }
  console.log(userData, "hola");
  }, [userData]);

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
    {userData.length > 0 && (
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
            <MyInput
              typeProp="text"
              nameProp="firstName"
              placeholderProp="firstName"
              value={profileData.firstName}
              isDisabled={!isEditing}
              handlerProp={inputHandler}
              />
            <MyInput
              typeProp="text"
              nameProp="lastName"
              placeholderProp="lastName"
              value={profileData.lastName}
              isDisabled={!isEditing}
              handlerProp={inputHandler}
            />
            <MyInput
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
            <Button variant="primary" onClick={() => {
              setShow(true);
              navigate("/appointmentDate");
            }}>
              Create Appointment
            </Button>
            {userData.length > 0 &&
              userData.map((dates, index) => (
                <Card key={index} style={{ marginBottom: '1rem' }}>
                  <Card.Body>
                  <MyInput
                      typeProp="text"
                      nameProp="id"
                      isDisabled={!isEditing}
                      value={dates.id}
                      />
                    <MyInput
                      typeProp="text"
                      nameProp="appointmentDate"
                      isDisabled={!isEditing}
                      value={dayjs(appDates.appointmentDate)
                        .format("dddd, MMMM D, YYYY h:mm A")}
                        inputHandler={inputHandlerDate}
                        />
                    <MyInput
                      typeProp="text"
                      nameProp="jobId"
                      isDisabled={!isEditing}
                      value={appDates.jobId}
                      inputHandler={inputHandlerDate}
                      />
                    <MyInput
                      typeProp="text"
                      nameProp="tattoArtistId"
                      isDisabled={!isEditing}
                      value={appDates.tattoArtistId}
                      inputHandler={inputHandlerDate}
                      />
                                      <Button className="date"
                    onClick={() => {navigate("/prueba")}}>
                    update
                  </Button>

                    <MyModal
                      dates={(dates.id,dates.appointmentDates,dates.jobId,dates.tattoArtistId)}
                      appDates={dates}
                      inputHandlerDate={inputHandlerDate}
                      token={token} 
                      handleUpdate={handleUpdate}
                      />
                  </Card.Body>
                </Card>
              ))}
          </Tab>
          <Tab eventKey="contact" title="Contact" disabled>
            Tab content for Contact
          </Tab>
        </Tabs>
        <Card.Body>
        </Card.Body>
      </Card>
  </>

  )}
  </>

      
      
      
  );
};