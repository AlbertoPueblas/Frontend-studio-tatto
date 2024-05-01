import { useNavigate } from "react-router-dom";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { ButtonC } from "../../components/ButtonC/ButtonC";
import { useEffect, useState } from "react";
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

  const [msg, setMsg] = useState("");
  

  const inputHandler = (e) => {
    //genero la función que bindea
    console.log(e);
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
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
    <div className="register-container registerElementsDesign">
      {msg === "" ? (
        <>
          <CustomInput
            typeProp={"text"}
            nameProp={"firstName"}
            handlerProp={(e) => inputHandler(e)}
            placeholderProp={"escribe tu nombre"}
          />
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
            title={"register!"}
            className={"regularButtonClass"}
            functionEmit={registerMe}
          />
        </>
      ) : (
        <div>{msg}</div>
      )}
      <pre>{JSON.stringify(credentials, null, 2)}</pre>
    </div>
  );
};
