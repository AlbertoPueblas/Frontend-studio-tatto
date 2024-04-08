import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomImput } from '../../components/CustomImput/CustomImput'
import './Login.css'

//--------------------------------------------------


export const Login = () => {
    const navigate = useNavigate()

    return (
        <div clasName="login-container">
            <h1 onClick={() => navigate("/")}>Login</h1>
        </div>
    )
} 

export const login = () => {
    const [count, setCount] = useState(0)
    const [inputData, setInputData] = useState("")
    const password = "contraseña correcta"

    //Instance
    const navigate = useNavigate()
  
    //Handlers
    const addCountButtonHandler = () => {
      setCount(count + 1)
    }
  
    const inputHandler = (event) => {
      setInputData(event.target.value)
    }
    
    //UseEfect
    useEffect(() => {
    }, [count])
  
    useEffect(() => {
      if (inputData === password) {
        console.log("sucesfully");
        navigate("/login")
       }
    },
    [inputData])

    return(
      <>
      <div className="card">
      <img src='./src/pages/img/fondo.jpg' className='img'></img>
        <CustomImput
        typeProp="email"
        nameProp="email input"
        placeholderProp="introduce tu email"
        handlerProp={inputHandler}
        />
        <input type='text'
         name='inputPrueba'
         placeholder='contraseña'
          onChange={(event) => inputHandler(event)}>
        </input>
        <button>Aceptar</button>
      </div>
        </>
    )
}
