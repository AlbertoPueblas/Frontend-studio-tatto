import {Navigate, Route, Routes} from "react-router-dom"
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Characters } from "../Characters/Characters";
import { Profile } from "../../Profile/Profile";
import { Menu } from "../Menu/Menu";
import { Admin } from "../Admin/Admin";
import { Appointment } from "../Appointment/Appointment"
import './Body.css'
// import { Prueba } from "../Prueba/Prueba"
//---------------------------------------------------------

export const Body = () => {

    return (
    
    <>
        <Routes>
            <Route path="*" element={<Navigate to="/" />}/>
            <Route path="/" element={<Home/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Profile" element={<Profile/>} />
            <Route path="/Register" element={<Register/>} />
            <Route path="/characters" element={<Characters/>} />
            <Route path="/admin" element={<Admin/>} />
            <Route path="/appointment" element={<Appointment/>} />
            {/* <Route path="/prueba" element={<Prueba/>} /> */}
            <Route path="/Menu" element={<Menu/>} />
        </Routes>
    </>
    );
};

