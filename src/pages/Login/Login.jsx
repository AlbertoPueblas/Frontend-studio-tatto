// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useEffect,useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useNavigate } from 'react-router-dom'
import { loginCall } from '../../services/apiCalls';
import { login } from "../../app/slice/userSlice";
import { useDispatch } from 'react-redux'
import { decodeToken } from "react-jwt";
import './Login.css'
import { ButtonC } from '../../components/ButtonC/ButtonC';

// //--------------------------------------------------

export const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
      email:"",
      password:""
    })
    const [msg, setMsg] = useState("");
  
    const dispatch = useDispatch()
  
    const inputHandler = (e) => {
    
    setCredentials((prevState) => ({
     ...prevState,
      [e.target.name]: e.target.value
    }))
  };

  const loginMe = async () => {
      const answer = await loginCall(credentials);
      if (answer.data.token) {
          const uDecoded = decodeToken(answer.data.token);

          const passport = {
              token: answer.data.token,
              decoded: uDecoded,
            };
            dispatch(login(passport))
            sessionStorage.setItem('passport', JSON.stringify(passport))
      
            setMsg(`${uDecoded.name}, welcome again`);
      
            setTimeout(() => {
                navigate("/Profile")
      }, 3000);
    }
  }

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

  return(
      <>
  
          <div className="login-container loginElementsDesign">
        {msg === "" ? (
            <>
              <CustomInput
                typeProp={"email"}
            nameProp={"email"}
            handlerProp={(e) => inputHandler(e)}
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
                    <ButtonC
            title={"logOut!"}
            className={"regularButtonClass"}
            functionEmit={logOutMe}
          />
        </>
      ) : (
        <div>{msg}</div>
      )}
      <pre>{JSON.stringify(credentials, null, 2)}</pre>
    </div>
    </>
  )
}
