import { useEffect, useState } from "react";
import { MyInput } from "../../components/MyInput/MyInput";
import { bringDates, bringProfile, deleteMeDate, updateDate } from "../../services/apiCalls";
import BootstrapModal from "../../components/BootstrapModal/BootstrapModal";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getUserData } from "../../app/slice/userSlice";
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
    userId: "",
    appointmentDate: "",
    jobId: "",
    tattoArtistId: "",
  })

  const [now, setNow] = useState(Date())
  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [show, setShow] = useState()
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
    setAppDates((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  useEffect(() => {
    const fetchData = async () => {
      const myProfileData = await bringProfile(token);
      setProfileData(myProfileData);
      const res = await bringDates(token);
      setUserData(res.clientDates);
    };
    fetchData();
  }, [token]);

  const deleteDate = async () => {
    const res = await deleteMeDate(data, token)
  };
 
  return (
    <>
      {userData.length > 0 && (
        <>
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
                    <Card key={index} style={{
                      marginBottom: '1rem',
                      borderColor: "blue",
                      boxShadow: "1px 3px 5px blue"
                    }}>
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
                          value={dayjs(dates.appointmentDate)
                            .format("dddd, MMMM D, YYYY h:mm A")}
                          inputHandler={inputHandlerDate}
                        />
                        <MyInput
                          typeProp="text"
                          nameProp="jobId"
                          isDisabled={!isEditing}
                          value={dates.jobId}
                          inputHandler={inputHandlerDate}
                        />
                        <MyInput
                          typeProp="text"
                          nameProp="tattoArtistId"
                          isDisabled={!isEditing}
                          value={dates.tattoArtistId}
                          inputHandler={inputHandlerDate}
                        />
                        <MyModal
                          dates={dates}
                          inputHandlerDate={inputHandlerDate}
                          onblurHandler={inputHandlerDate}
                          token={token}
                        />
                        {/* <Button onClick={() => (deleteDate)} ></Button> */}
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