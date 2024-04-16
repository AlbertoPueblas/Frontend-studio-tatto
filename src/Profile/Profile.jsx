import { useEffect, useState } from "react";
import { CustomInput } from "../components/CustomInput/CustomInput";
import { bringProfile, loginOut } from "../services/apiCalls";
import { ButtonC } from "../components/ButtonC/ButtonC";
import { deleteUser } from "../services/apiCalls";

import { inputValidator } from "../utils/validators";
import BootstrapModal from "../components/BootstrapModal/BootstrapModal";
import { useDispatch } from "react-redux";
// import { getLoggedAmount, getUserData, resetCount } from "../app/slice/userSlice";
import { useNavigate } from 'react-router-dom'
import { logout } from "../app/slice/userSlice";


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

  const myPassport= JSON.parse(sessionStorage.getItem("passport"))
  // console.log(myPassport);
  console.log(typeof(myPassport));
  const token = myPassport.token;
  console.log(token);


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

    const deleteProfile = async() => {
        try {
            await deleteUser(profileData, token);
            console.log("datos borrados");
            setTimeout(() => {
              navigate("/Home")
            }, 1000)
            dispatch(logout(myPassport))
            sessionStorage.removeItem('passport', JSON.stringify(myPassport))


        } catch (error) {
            console.log(error);
        }
    };

    const logOutMe = async () => {
      const answer = await loginOut(credentials);
      if (answer.data.token) {
          const uDecoded = decodeToken(answer.data.token);
  
          const passport = {
              token: answer.data.token,
              decoded: uDecoded,
            };
            dispatch(login(passport))
            sessionStorage.removeItem('passport', JSON.stringify(passport))
      
            setMsg(`${uDecoded.name}, welcome again`);
      
            setTimeout(() => {
                navigate("/Home")
      }, 3000);
    }
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
        typeProp="email"
        nameProp="email"
        placeholderProp="email"
        value={profileData.email}
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
                <ButtonC
            title={"Delete Profile"}
            className={"regularButtonClass"}
            functionEmit={deleteProfile}
          />

<ButtonC
            title={"logOut!"}
            className={"regularButtonClass"}
            functionEmit={logOutMe}
          />
(
        <>
          <BootstrapModal 
          profileData={profileData}
          inputHandler={inputHandler}
          token={token}/>
        </>
      )
    </>
  );
};