import { appointmentCreate } from "../../services/apiCalls";
import { useState } from 'react'
import './AppointmentDate.css'
import dayjs from "dayjs"
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ButtonC } from "../../components/ButtonC/ButtonC";


//------------------------------------------------------------

export const Dates = () => {
    const [isEditing, setIsEditing] = useState();
    const navigate = useNavigate()

    const [appDates, setAppDates] = useState({
        appointmentDate: "",
        userId: "",
        tattoArtistId: "",
        jobId: "",
    })
    const [now, setNow] = useState(Date())
    const [selected, setSelected] = useState();
    const [msg, setMsg] = useState("")

    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token

    const inputHandlerDate = (e) => {
        console.log(typeof (e.target.value), e.target.name);
        setAppDates((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const dateForMe = async () => {
        try {
            const res = await appointmentCreate(appDates, token);
            console.log(res);
            // setMsg(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const manageTime = (e) => {
        if (dayjs(e).diff(now, "d") <= 0) {
            setMsg("No puedes seleccionar una fecha anterior a la actual")
            setSelected(null)
            return;
        }
        setSelected(dayjs(e).format("dddd, MMMM D, YYYY h:mm A"))
    }

    return (
        <>
            <div className='calendar'>Actual Date:{dayjs(now).format
                ("dddd, MMMM D, YYYY h:mm A")}</div>

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
                {msg && <div>{msg}</div>}
            </div>
            <CustomInput
                typeProp="date"
                nameProp="appointmentDate"
                placeholderProp="date"
                handlerProp={(e) => inputHandlerDate(e)}
            />
            <CustomInput
                typeProp="text"
                nameProp="userId"
                placeholderProp="UserId"
                handlerProp={(e) => inputHandlerDate(e)}
            />

            <CustomInput
                typeProp="text"
                nameProp="jobId"
                placeholderProp="jobId"
                handlerProp={(e) => inputHandlerDate(e)}
            />

            <CustomInput
                typeProp="text"
                nameProp="tattoArtistId"
                placeholderProp="tattoArtistId"
                handlerProp={(e) => inputHandlerDate(e)}
            />


            <Button onClick={() => {
                dateForMe(),
                    navigate("/profile")
            }}>
                Send Appointment
            </Button>
            {/* <ButtonC
            title={"Date!"}
            className={"regularButtonClass"}
            functionEmit={dateForMe}
          /> */}
        </>
    )
};
export default Dates