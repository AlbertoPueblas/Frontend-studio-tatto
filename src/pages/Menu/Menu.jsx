import { useNavigate } from 'react-router-dom'
import "./Menu.css"

//----------------------------------------------

export const Menu = () => {
    const navigate = useNavigate()

    return(
        <>
        <h1>Menu</h1>
        <button onClick={()=> navigate("/Profile")} >Profile</button>
        </>
    )
}