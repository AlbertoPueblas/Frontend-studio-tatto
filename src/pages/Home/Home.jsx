import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Home.css'
import { CustomInput } from "../../components/CustomInput/CustomInput";

//--------------------------------------------------

export const Home = () => {
  const [count, setCount] = useState(0)
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate()

  const inputHandler = (event) => {
    setCredentials((prevState) => ({
      ...prevState,
       [event.target.name]: event.target.value
    }))
  }

  useEffect(() => {
    console.log(credentials);
  }, [credentials])


  return (
    <>
      <div className="card">
        <img src='./src/pages/img/logo.jpg' className='img'></img>
      </div>
    </>
  )
}
