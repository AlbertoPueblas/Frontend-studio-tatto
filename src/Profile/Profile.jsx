import { useEffect, useState } from "react";
import { CustomInput } from "../components/CustomInput/CustomInput";
import { bringProfile, loginOut } from "../services/apiCalls";
import { ButtonC } from "../components/ButtonC/ButtonC";
// import { deleteUser } from "../services/apiCalls";
import { inputValidator } from "../utils/validators";
import BootstrapModal from "../components/BootstrapModal/BootstrapModal";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { getUserData, logout,  } from "../app/slice/userSlice";

//---------------------------------------------------------------------------

export const Profile = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

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
    }));
  };


  useEffect(() => {
    const fetchProfile = async () => {
      const myProfileData = await bringProfile(token);
      setProfileData(myProfileData);
    };
    fetchProfile();
  }, []);

  // const deleteProfile = async () => {
  //   try {
  //     await deleteUser(profileData, token);
  //     // res.json(await deleteUser(req.params.id,req.payload))
  //     console.log(profileData);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const logOutMe = () => {
    dispatch(logout())
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
      <CustomInput
        typeProp="email"
        nameProp="email"
        placeholderProp="email"
        value={profileData.email}
        isDisabled={!isEditing}
        handlerProp={inputHandler}
      />
      <ButtonC
        title={"Delete Profile"}
        className={"regularButtonClass"}
        
        // functionEmit={()=> {
        //   deleteProfile()
        // }}
      />

      <button onClick={() => {
        logOutMe()
        navigate("/Home")
      }}>log out</button>

      (
      <>
        <BootstrapModal
          profileData={profileData}
          inputHandler={inputHandler}
          token={token} />
      </>
      )
    </>
  );
};