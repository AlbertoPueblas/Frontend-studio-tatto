import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

//---------------------------------------------

export const Login = () => {
    const navigate = useNavigate()

    return (
        <div clasName="login-container">
        <h1 onClick={() => navigate("/")}>Profile</h1>
        <CustomImput
        typeProp="email"
        nameProp="email input"
        placeholderProp="introduce tu email"
        handlerProp={inputHandler}/>
        <input type='text'
         name='inputPrueba'
         placeholder='contraseña'onClick={(event) => inputHandler(event)}>
        </input>
        </div>
    )
} 