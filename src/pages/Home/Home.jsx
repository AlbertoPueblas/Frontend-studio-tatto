import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Home.css'

//--------------------------------------------------

export const Home = () => {
  const [count, setCount] = useState(0)
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

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
      {/* <div className="card">
      <img src='./src/pages/img/logo.jpg' className='img'></img>
        <CustomInput
        typeProp="email"
        nameProp="email input"
        placeholderProp="introduce tu email"
        handlerProp={inputHandler}
        />
        <input type='text'
         name='inputPrueba' onChange={(event) => inputHandler(event)}
         placeholder='contraseña'
          >
        </input>
      </div> */}
      <div className="card">
        <Form>
          <h1>Login</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword" >
            <Form.Label >Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            <h3 onChange={(event) => inputHandler(event)}>Login</h3>
          </Button>
        </Form>
        <img src='./src/pages/img/logo.jpg' className='img'></img>
      </div>
    </>
  )
}

