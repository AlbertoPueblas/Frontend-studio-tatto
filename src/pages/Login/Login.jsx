import { useEffect, useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { Navigate, useNavigate } from 'react-router-dom'
import { loginCall } from '../../services/apiCalls';
import { getUserData, login } from "../../app/slice/userSlice";
import { useDispatch, useSelector } from 'react-redux'
import { decodeToken } from "react-jwt";
import './Login.css'
import { ButtonC } from '../../components/ButtonC/ButtonC';
import { inputValidator } from "../../utils/validators";

//--------------------------------------------------

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })

  const [isValidContent, setIsValidContent] = useState({
    email: true,
    password: true,
  });

  const [loginError, setLoginError] = useState("")
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [msg, setMsg] = useState("");

  const dispatch = useDispatch()

  //actualiza estado
  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const loginMe = async () => {
    try {
      const answer = await loginCall(credentials);
      if (answer.data.token) {
        const uDecoded = decodeToken(answer.data.token);

        const passport = {
          token: answer.data.token,
          decoded: uDecoded,
        };
        dispatch(login(passport))

        setMsg(` welcome again`);

        // const userReduxData = useSelector(amIAdmin)
        // const userType = userReduxData.decoded.userRole

        setTimeout(() => {
          credentials.email === "admin1@admin.com" ?
            navigate("/admin") :
            navigate("/menu")
        }, 1000);
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        setLoginError("el servidor no está corriendo")
      }
      else {
        setLoginError(error.response.data.error)
      }
    }
  };

  const inputValidatorHandler = (e) => {
    const errorMessage = inputValidator(e.target.value, e.target.name);
    setIsValidContent((prevState) => ({
      ...prevState,
      [e.target.name]: errorMessage,
    }));
  };

  return (

    <div className={isValidContent.email &&
      isValidContent.password ? "loginContainer" : "loginContainerFalse"}
    >
      {msg === "" ? (
        <>
          <h1 className={isValidContent.email &&
            isValidContent.password ? "text" : "textFalse"}>Login</h1>
          <CustomInput
            isValidContent={isValidContent.email}
            typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            placeholderProp={"escribe tu e-mail"}
            errorText={isValidContent.email}
          />
          <CustomInput
            isValidContent={isValidContent.password}
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"escribe el password"}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            errorText={isValidContent.password}
          />

          <ButtonC
            title={"log me!"}
            className={"Button"}
            functionEmit={loginMe}
          />
          <h3>{loginError}</h3>
        </>
      ) : (
        <div>{msg}</div>
      )}
    </div>
  )

};
