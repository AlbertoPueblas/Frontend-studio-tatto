import { useEffect,useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useNavigate } from 'react-router-dom'
import { loginCall } from '../../services/apiCalls';
import { login } from "../../app/slice/userSlice";
import { useDispatch } from 'react-redux'
import { decodeToken } from "react-jwt";
import './Login.css'
import { ButtonC } from '../../components/ButtonC/ButtonC';

//--------------------------------------------------

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
      email:"",
      password:""
    })

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

  // const inputValidatorHandler = (e) => {
  //   const isValid = inputValidator(e.target.value, e.target.name)
  //   console.log("Es valido?",isValid);
  // }

  const loginMe = async () => {
    const answer = await loginCall(credentials);
      if (answer.data.token) {
          const uDecoded = decodeToken(answer.data.token);

          const passport = {
              token: answer.data.token,
              decoded: uDecoded,
            };
            dispatch(login(passport))
      
            setMsg(`${uDecoded.name}, welcome again`);
      
            setTimeout(() => {
                navigate("/Profile")
      }, 3000);
    }
  }



  return(

      <div className="login-container loginElementsDesign">
        {msg === "" ? (
            <>
              <CustomInput
                typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
            onBlurHandler={(e) => inputValidatorHandler(e)}
            placeholderProp={"escribe tu e-mail"}
          />
          <CustomInput
            typeProp={"password"}
            nameProp={"password"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"escribe el password"}
          />

          <ButtonC
            title={"log me!"}
            className={"regularButtonClass"}
            functionEmit={loginMe}
          />
        </>
      ) : (
        <div>{msg}</div>
      )}
      <pre>{JSON.stringify(credentials, null, 2)}</pre>
    </div>
  )
};
