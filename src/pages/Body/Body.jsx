import {Navigate, Route, Routes} from "react-router-dom"
import { Login } from "../Login/Login";
import { Home } from "../Home/Home";
import { Register } from "../Register/Register";
import { Characters } from "../Characters/Characters";
import './Body.css'
import { Profile } from "../../Profile/Profile";
import { Menu } from "../Menu/Menu";

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
            <Route path="/Menu" element={<Menu/>} />
        </Routes>
    </>
    );
};