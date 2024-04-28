// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import './Home.css'
// import { CustomInput } from "../../components/CustomInput/CustomInput";
import { loginCall } from '../../services/apiCalls';
import { useDispatch } from 'react-redux';
import { decodeToken } from 'react-jwt';
import { login } from '../../app/slice/userSlice';

//--------------------------------------------------

export const Home = () => {

  const admin = {
    email: "admin1@admin.com",
    password: "12345678"
  }

  const dispatch = useDispatch()

  const loginMe = async (role) => {

    const answer = await loginCall(role);
    if (answer.data.token) {
        const uDecoded = decodeToken(answer.data.token);

        const passport = {
            token: answer.data.token,
            decoded: uDecoded,
          };
          dispatch(login(passport))
          console.log(passport);
  }
}

  return (
    <>
      <div className="card">
        <button onClick={() => loginMe(admin)}>Admin</button>
        {/* <button onClick={() => loginMe(user)}>User</button> */}
        <img src='./src/pages/img/logo.jpg' className='img'></img>
      </div>
    </>
  )
}
