// import { useEffect, useState } from "react";
// import { CustomInput } from "../../components/CustomInput/CustomInput";

// //----------------------------------------------------------------------

// export const Register = () => {
//   const [count, setCount] = useState(0);
//   const [credentials, setCredentials] = useState({
//     email: "",
//     password: ""
//   });

//   console.log("close modal estuvo aquí")

//   const inputHandler = (event) => {
//     setCredentials((prevState) => ({
//       ...prevState,
//       [event.target.name]: event.target.value
//     }));
//   };

//   // useEffects
//   useEffect(() => {}, [count]);

//   useEffect(() => {
//     console.log(credentials);
//   }, [credentials]);
  
// };