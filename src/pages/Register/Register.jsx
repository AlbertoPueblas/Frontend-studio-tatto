import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useState } from "react";
import { registerNewUserCall } from "../../services/apiCalls";
import "./Register.css";
import { inputValidator } from "../../utils/validators";

export const Register = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const [isValidContent, setIsValidContent] = useState({
    firstName:true,
    email: true,
    password: true,
  });

  const [msg, setMsg] = useState("");

  const inputHandler = (e) => {
    //genero la función que bindea
    console.log(e);
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const inputValidatorHandler = (e) => {
    const errorMessage = inputValidator(e.target.value, e.target.name);
    console.log(errorMessage);
    setIsValidContent((prevState) => ({
      ...prevState,
      [e.target.name]: errorMessage,
    }));
  };

  const registerMe = async () => {
    if (inputValidator(credentials.firstName, "firstName") &&
      inputValidator(credentials.password, "password")) {
      const answer = await registerNewUserCall(credentials);
      console.log(answer)
      setMsg(answer.data.message);

      if (answer.data) {
        setTimeout(() => {
          navigate("/Login");
        }, 2000);
      }
    }
    else {
      console.log("credenciales incorrectas, algún campo no está bien introducido")
    }
  };

  return (
    <div className={isValidContent.firstName && isValidContent.email && 
    isValidContent.password ? "registerContainer" : "registerContainerFalse"}>
      {msg === "" ? (
        <>

          <div className="cardForm">
            <h1 className={isValidContent.firstName && isValidContent.email && 
    isValidContent.password ? "h1" : "h1False"}>Register</h1>

            <CustomInput
              typeProp={"text"}
              nameProp={"firstName"}
              handlerProp={(e) => inputHandler(e)}
              onBlurHandler={(e) => inputValidatorHandler(e)}
              isValidContent={isValidContent.firstName}


              placeholderProp={"escribe tu nombre"}
            />
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
              title={"register!"}
              className={"Button"}
              functionEmit={registerMe}
            />
          </div>
        </>
      ) : (
        <div>{msg}</div>
      )}
      {/* <pre>{JSON.stringify(credentials, null, 2)}</pre> */}
    </div>
  );
};
