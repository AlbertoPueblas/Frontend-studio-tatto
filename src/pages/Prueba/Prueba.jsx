import { useState } from 'react'
import './Prueba.css'
import dayjs from "dayjs"
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useNavigate } from 'react-router-dom';

//--------------------------------

function Prueba() {

    const [now, setNow] = useState(Date())
    const [selected, setSelected] = useState();
    const [msg, setMsg] = useState("")

    const manageTime = (e) => {
        if (dayjs(e).diff(now, "d") <= 0) {
            setMsg("No puedes seleccionar una fecha anterior a la actual")
            setSelected(null)
            return;
        }
        setSelected(dayjs(e).format("dddd, MMMM D, YYYY h:mm A"))
    };
    return (
        <>
            {userType === "Admin"
                ? (<>
                </>) : null}
        </>
    );
}

export default Prueba
{/* <div className='calendar'>Actual Date:{dayjs(now).format("dddd, MMMM D, YYYY h:mm A")}</div>
    <DayPicker className='calendar'
        mode="single"
        selected={selected}
        onSelect={(e) => manageTime(e)}
    />
    <div className='calendar'>
        {selected && (
        <>
        <div>Selected Date:{selected}</div>
        <div>Remaining time: {dayjs(selected).diff(now, "d") + 1}Days.</div>
        </>
    )}
        {msg &&<div>{msg}</div>}
        </div> */}