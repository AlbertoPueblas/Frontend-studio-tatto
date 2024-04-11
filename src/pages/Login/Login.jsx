// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import { useEffect,useState } from "react";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useNavigate } from 'react-router-dom'
import { loginCall } from '../../services/apiCalls';
import { login } from "../userSlice";
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
  
  // const dispatch = useDispatch()
  
  const inputHandler = (e) => {
    // setInputData(event.target.value)
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
      // dispatch(login(passport))
      console.log(passport);
      sessionStorage.setItem('passport', JSON.stringify(passport))

      setMsg(`${uDecoded.name}, welcome again`);

      setTimeout(() => {
        navigate("/Menu")
      }, 3000);
    }
  }
  
  // useEffect(() => {
  //   if (inputData === password) {
  //     console.log("sucesfully");
  //     navigate("/Profile")
      
  //   } 
  // })
  return(
    <>
        {/* <div className="login-container">
          <Form>
            <h1>Login</h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
  
      <Form.Group className="mb-3" controlId="formBasicPassword" onChange={(event) => inputHandler(event)}>
        <Form.Label >Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
            <h3 >Login</h3>
      </Button>
    </Form>
        </div> */}
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
        </>
      ) : (
        <div>{msg}</div>
      )}
      <pre>{JSON.stringify(credentials, null, 2)}</pre>
    </div>
    </>
  )
}