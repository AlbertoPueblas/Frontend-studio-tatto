import {Navigate, Route, Routes} from "react-router-dom"
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Menu } from "../Menu/Menu";
import { Admin } from "../Admin/Admin";
import { Appointment } from "../Appointment/Appointment"
import './Body.css'
import AppointmentDate from "../AppointmentDate/AppointmentDate";
import Jobs from "../Job/Jobs"
import Artist from "../Artist/Artist"

//---------------------------------------------------------

export const Body = () => {
    return (
    <>
        <Routes>
            <Route path="*" element={<Navigate to="/" />}/>
            <Route path="/" element={<Home/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/menu" element={<Menu/>} />
            <Route path="/Profile" element={<Profile/>} />
            <Route path="/Register" element={<Register/>} />
            {/* <Route path="/characters" element={<Characters/>} /> */}
            <Route path="/admin" element={<Admin/>} />
            <Route path="/appointment" element={<Appointment/>} />
            <Route path="/appointmentDate" element={<AppointmentDate/>} />
            <Route path="/job" element={<Jobs/>} />
            <Route path="/artist" element={<Artist/>} />
        </Routes>
    </>
    );
};

