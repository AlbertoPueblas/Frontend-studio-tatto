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
      <h1>SOY HOME</h1>
      <h1>Vite + React</h1>
      <h2>Este es el subtítulo</h2>
      <div className="card">
      <img src='./src/pages/img/logo.jpg' className='img'></img>
        <button>Bring My Profile</button>
        <h3>LOGIN</h3>
        <CustomInput
          typeProp="email"
          nameProp="email"
          placeholderProp="introduce tu email"
          handlerProp={inputHandler}
        />
        <CustomInput
          typeProp="password"
          nameProp="password"
          placeholderProp=""
          handlerProp={inputHandler}
        />
      </div>
      {/* <div className="card">
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
            <h3 >Login</h3>
          </Button>
        </Form>
        <img src='./src/pages/img/logo.jpg' className='img'></img>
      </div>
    </>
  )
} */}
 </>
  );
};

