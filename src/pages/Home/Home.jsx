import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CustomImput } from '../../components/CustomImput/CustomImput'
import './Home.css'

//--------------------------------------------------

export const Home = () => {
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
        navigate("/Profile")
       }
    },
    [inputData])

    return(
      <>
      <button className='button' onClick={(event) => inputHandler(event)}>Iniciar sesion</button>
      <div className="card">
      <img src='./src/pages/img/logo.jpg' className='img'></img>
        {/* <CustomImput
        typeProp="email"
        nameProp="email input"
        placeholderProp="introduce tu email"
        handlerProp={inputHandler}
        />
        <input type='text'
         name='inputPrueba'
         placeholder='contraseña'
          >
        </input> */}
      </div>
        </>
    )
}

