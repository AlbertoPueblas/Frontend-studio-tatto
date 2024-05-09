import { appointmentCreate, bringAllArtist, bringAllJobs } from "../../services/apiCalls";
import { useEffect, useState } from 'react'
import './AppointmentDate.css'
import dayjs from "dayjs"
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useSelector } from "react-redux";
import { getUserData } from "../../app/slice/userSlice";
import { CustomInput } from "../../components/CustomInput/CustomInput";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";



import React from 'react';
import { MyInput } from "../../components/MyInput/MyInput";
//------------------------------------------------------------

export const Dates = () => {
    const [isEditing, setIsEditing] = useState();
    const navigate = useNavigate()

    const [appCreate, setAppCreate] = useState({
        appointmentDate: "",
        tattoArtistId: "",
        jobId: "",
    })
    const [jobs, setJobs] = useState([])
    const [Artists, setArtists] = useState([])
    const [now, setNow] = useState(Date())
    const [selected, setSelected] = useState();
    const [msg, setMsg] = useState("")

    const userReduxData = useSelector(getUserData)
    const token = userReduxData.token

    const inputHandlerDates = (e) => {

        console.log(e.target.value, e.target.name);
        setAppDate((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,

        }));
    };



    useEffect(() => {
        const fetchArtist = async () => {
            const res = await bringAllArtist(token)
            console.log(res.data.artist);
            setArtists(res.data.artist)
        }
        fetchArtist()
    }, [])


    useEffect(() => {
        const fetchJobs = async () => {
            const res = await bringAllJobs(token)
            console.log(res.data.jobs);
            setJobs(res.data.jobs)
        }
        fetchJobs()
    }, [])

    const dateForMe = async () => {
        try {
            const res = await appointmentCreate(appCreate, token);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    // const manageTime = (e) => {
    //     if (dayjs(e).diff(now, "d") <= 0) {
    //         setMsg("No puedes seleccionar una fecha anterior a la actual")
    //         setSelected(null)
    //         return;
    //     }
    //     setSelected(dayjs(e).format("dddd, MMMM D, YYYY h:mm A"))
    // }



    // const handleChange = (e) => {
    //     const selectedDate = dayjs(e.target.value);
    //     const currentDate = dayjs();

    //     if (selectedDate.isBefore(currentDate, 'day')) {
    //         // Si la fecha seleccionada es anterior al día actual, muestra un mensaje
    //         alert("No puedes seleccionar una fecha anterior a la actual");
    //         return;
    //     }

    //     // Si la fecha seleccionada es válida, llama a la función handlerProp para manejar el cambio
    //     handlerProp(e);
    // };


    return (
        <>
            <div className='calendar'>Actual Date:{dayjs(now).format
                ("dddd, MMMM D, YYYY h:mm A")}</div>

            {/* <DayPicker className='calendar'
                mode="single"
                name="appointmentDate"
                selected={selected}
                onSelect={(e) => manageTime(e)}
                onChange={(e) => {inputHandlerDate(e);handleChange(e)}}
            /> */}
            <MyInput
                typeProp="datetime-local"
                nameProp="appointmentDate"
                value={selected}
                placeholderProp="date"
                handlerProp={(e) => inputHandlerDates(e)}
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
            <select name="jobId" onChange={(e) => inputHandlerDates(e)}
                className="select">
                <option value="">Select Job</option>
                {jobs.map((job) => {
                    return (
                        <option value={job.id} key={job.id}>{job.jobs}</option>
                    )
                })}
            </select>
            <select name="tattoArtistId" onChange={(e) => inputHandlerDates(e)}
                className="select">
                <option value="">Select Artist</option>
                {Artists.map((art) => {
                    return (
                        <option value={art.id} key={art.id}>{art.firstName}</option>
                    )
                })}
            </select>



            <Button onClick={() => {
                dateForMe(),
                    navigate("/profile")
            }}>
                Send Appointment
            </Button>
        </>
    )
};
export default Dates